import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './SideBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

function SideBar(props) {
	let [sideBarStatus, setSideBarStatus] = useState(true);
	let [commitsInfo, setCommitsInfo] = useState([]);
	
	function handleSubmit(event) {
		event.preventDefault();
	}
	
	let userIdx = 58;
	console.log(props);
	useEffect(() => {
		axios.get(`http://43.200.26.215:3000/commits/users/${userIdx}/books/${props.pdfIdx}`)
			.then((response) => {
				console.log(response);
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
						<input className={styles.historyInput} placeholder={'기록을 남기세요.'} onKeyUp={(event) => {
							event.preventDefault();
							let nowDate = new Date();
							let result = nowDate.getFullYear() + '-' + nowDate.getMonth() + '-' + nowDate.getDay() + ' ' + nowDate.getHours() + ':' + nowDate.getMinutes() + ':' + nowDate.getSeconds();
							
							if (window.event.keyCode === 13) {
								// 한글 입력하면 2번 감...
								// axios.get()
								// 	.then(() => {
								// 		axios.post(`http://43.200/26.215:3000/commits`, {
								// 		userBookIdx: ,
								// 		commitMessage: event.target.value,
								// 		userIdx: 58,
								// 		createdAt: result,
								// 		editorLog: 
								// 	})
								// 	.then((response) => {
										
								// 	})
								// 	.cathcn((error) => {
										
								// 	})
								// 	.then(() => {
								// 		axios.get
								// 	})
								// 	})
							}
						}}></input>
					</form>
					<div>
						<History></History>
						<History></History>
					</div>
				</div>
				
			</div>
			<FontAwesomeIcon icon={sideBarStatus === true ? faAngleLeft : faAngleRight} className={styles.sideBarToggleButton} onClick={() => {setSideBarStatus(!sideBarStatus);}}></FontAwesomeIcon>
		</>
	)
}

function History(props) {
	return (
		<>
			<div className={styles.historyWrap}>
				<ul className={styles.historyUnorderedListTag}>
					<li>
						<p className={styles.historyMessage}>메시지</p>
						<p className={styles.historyDate}>날짜</p>
					</li>
				</ul>
			</div>
		</>
	)
}

export default SideBar;