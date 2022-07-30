import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import styles from './SideBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

// mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import * as React from 'react';

function SideBar(props) {
	const [sideBarStatus, setSideBarStatus] = useState(false);
	const [commitsInfo, setCommitsInfo] = useState([]);
	const commitInput = useRef();
	const date = dayjs();
	const result = date.format('YYYY-MM-DD HH:mm:ss');
	
	let userIdx = 58;
	
	function handleSubmit(event) {
		event.preventDefault();

		axios.post('https://inkyuoh.shop/commits', {
				pdfIdx: props.currentBookInfo.pdfIdx,
				userIdx: userIdx,
				createdAt: result,
				commitMessage: commitInput.current.value
			})
			.then((response) => {
				setShowSnackBar(true);
				console.log('Commit response:', response);
				axios.get(`https://inkyuoh.shop/commits/users/${userIdx}/books/${props.currentBookInfo.pdfIdx}`)
					.then((response) => {
						console.log('Reset commitsInfo response:', response);
						setCommitsInfo(response.data.result.reverse());
					})
					.catch((error) => {
						console.log('Reset commitsInfo Fail, error:', error);
					})
			})
			.catch((error) => {
				console.log('Commit Fail, error:', error);
			})
			
		commitInput.current.value = null;
	}
	
	useEffect(() => {
		axios.get(`https://inkyuoh.shop/commits/users/${userIdx}/books/${props.currentBookInfo.pdfIdx}`)
			.then((response) => {
				console.log(response);
				setCommitsInfo(response.data.result.reverse());
			})
			.catch((error) => {
				console.log(error);
			})
	}, [sideBarStatus])
	
	// snack bar
	const [showSnackBar, setShowSnackBar] = useState(false);
	
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        
        setShowSnackBar(false);
    }
    
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props}></MuiAlert>
    })

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
				
				<Stack spacing={2} sx={{ width: '100%'}}>
					<Snackbar open={showSnackBar} autoHideDuration={3000} onClose={handleClose}>
						<Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
							저장이 완료되었습니다.
						</Alert>
					</Snackbar>
				</Stack>
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