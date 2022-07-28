import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import styles from './SideBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

function SideBar(props) {
	let [sideBarStatus, setSideBarStatus] = useState(false);
	let [commitsInfo, setCommitsInfo] = useState([]);
	let commitInput = useRef();
	let date = dayjs();
	let result = date.format('YYYY-MM-DD HH:mm:ss');
	let userIdx = 58;
	
	function handleSubmit(event) {
		event.preventDefault();
		console.log(userIdx);
		console.log(props.currentBookInfo.pdfIdx);
		console.log(result);
		console.log(commitInput.current.value);

		axios.post('http://43.200.26.215:3000/commits', {
				pdfIdx: props.currentBookInfo.pdfIdx,
				userIdx: userIdx,
				createdAt: result,
				commitMessage: commitInput.current.value
			})
			.then((response) => {
				console.log('Commit response:', response);
				axios.get(`http://43.200.26.215:3000/commits/users/${userIdx}/books/${props.currentBookInfo.pdfIdx}`)
					.then((response) => {
						console.log('Reset commitsInfo response:', response);
						setCommitsInfo(response.data.result);
					})
					.catch((error) => {
						console.log('Reset commitsInfo Fail, error:', error);
					})
			})
			.catch((error) => {
				console.log('Commit Fail, error:', error);
			})
	}
	
	useEffect(() => {
		axios.get(`http://43.200.26.215:3000/commits/users/${userIdx}/books/${props.currentBookInfo.pdfIdx}`)
			.then((response) => {
				console.log(response);
				setCommitsInfo(response.data.result);
			})
			.catch((error) => {
				console.log(error);
			})
	}, [sideBarStatus])

	return (
		<>
			<div className={styles.sideBarContents} style={sideBarStatus === true ? {} : {display: 'none'}}>
				<div className={styles.bookInfo}>
					<div className={styles.bookImage} style={{backgroundImage: "url(" + `${process.env.PUBLIC_URL + `${props.currentBookInfo.firstPageLink}`}`}}></div>
					<p className={styles.bookTitle}>{props.currentBookInfo.pdfName}</p>
				</div>
				<hr style={{ width: '100%', marginTop: 24, marginBottom: 24, marginLeft: 16, marginRight: 16 }}></hr>
				<div className={styles.historyContainer}>
					<div className={styles.historyTitle}>Commit</div>
					<form onSubmit={(event) => { handleSubmit(event)} }>
						<input ref={commitInput} className={styles.historyInput} placeholder={'기록을 남기세요.'}></input>
					</form>
					<div className={styles.historyWrap}>
						<History commitIdx={props.commitIdx} setCommitIdx={props.setCommitIdx} commitsInfo={commitsInfo}></History>
					</div>
				</div>
				
			</div>
			<FontAwesomeIcon icon={sideBarStatus === true ? faAngleLeft : faAngleRight} className={styles.sideBarToggleButton} onClick={() => {setSideBarStatus(!sideBarStatus);}}></FontAwesomeIcon>
		</>
	)
}

function History(props) {
	function rollback(element) {
		props.setCommitIdx(element.commitIdx);
	}
	
	return (
		<>
			{props.commitsInfo?.map(function(element, index) {
				return (
					<ul className={styles.historyUnorderedListTag} key={index} onClick={() => {
						rollback(element);
					}}>
						<li>
							<p className={styles.historyMessage}>{element.commitMessage}</p>
							<p className={styles.historyDate}>{element.createdAt}</p>
						</li>
					</ul>
				)
			})}
		</>
	)
}

export default SideBar;