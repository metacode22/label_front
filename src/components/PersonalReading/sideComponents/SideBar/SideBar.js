import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import styles from './SideBar.module.css'
import { faAngleRight, faAngleLeft, faEye, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

// mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import * as React from 'react';

//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SideBar(props) {
	const [sideBarStatus, setSideBarStatus] = useState(false);
	const [commitsInfo, setCommitsInfo] = useState([]);
	const commitInput = useRef();
	const date = dayjs();
	const result = date.format('YYYY-MM-DD HH:mm:ss');
	
	console.log(props);
	
	let userIdx = 58;
	
	function handleSubmit(event) {
		event.preventDefault();
		
		if (commitInput.current.value !== '') {			
			axios.post('https://inkyuoh.shop/commits', {
					pdfIdx: props.currentBookInfo.pdfIdx,
					userIdx: userIdx,
					createdAt: result,
					commitMessage: commitInput.current.value
				})
				.then((response) => {					
					console.log('Commit response:', response);
					axios.get(`https://inkyuoh.shop/commits/users/${userIdx}/books/${props.currentBookInfo.pdfIdx}`)
						.then((response) => {
							console.log('Reset commitsInfo response:', response);
							setCommitsInfo(response?.data?.result?.reverse());
							setShowSnackBar(true);
						})
						.catch((error) => {
							console.log('Reset commitsInfo Fail, error:', error);
						})
				})
				.catch((error) => {
					console.log('Commit Fail, error:', error);
				})
				
			commitInput.current.value = null;
		} else {
			setShowErrorSnackBar(true);
		}
	}
	
	useEffect(() => {
		axios.get(`https://inkyuoh.shop/commits/users/${userIdx}/books/${props.currentBookInfo.pdfIdx}`)
			.then((response) => {
				console.log(response);
				setCommitsInfo(response?.data?.result?.reverse());
			})
			.catch((error) => {
				console.log(error);
			})
	}, [sideBarStatus])
	
	// snack bar
	const [showSnackBar, setShowSnackBar] = useState(false);
	const [showErrorSnackBar, setShowErrorSnackBar] = useState(false);
	
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        
        setShowSnackBar(false);
		setShowErrorSnackBar(false);
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
				<hr style={{ width: '100%', marginTop: 24, marginBottom: 24, marginLeft: 24, marginRight: 16 }}></hr>
				<div className={styles.historyContainer}>
					<div className={styles.historyTitle}>History</div>
					<form onSubmit={(event) => { handleSubmit(event)} }>
						<input ref={commitInput} className={styles.historyInput} placeholder={'기록을 남기세요.'}></input>
					</form>
					<div className={styles.historyWrap}>
						<History readOnly={props.readOnly} setReadOnly={props.setReadOnly} forceUpdate={props.forceUpdate} setForceUpdate={props.setForceUpdate} commitIdx={props.commitIdx} setCommitIdx={props.setCommitIdx} commitsInfo={commitsInfo}></History>
					</div>
				</div>
				
				<Stack spacing={2} sx={{ width: '100%'}}>
					<Snackbar open={showSnackBar} autoHideDuration={4500} onClose={handleClose}>
						<Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
							저장이 완료되었습니다.
						</Alert>
					</Snackbar>
					<Snackbar open={showErrorSnackBar} autoHideDuration={4500} onClose={handleClose}>
						<Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
							기록 내용을 작성해주시기 바랍니다.
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
		props.setReadOnly(-1);
		
		async function postLogs(element) {
			await axios.post(`https://inkyuoh.shop/commits/rollback`, {
				commitHighlightLog: JSON.parse(element.logs),
				userBookIdx: element.userBookIdx
			})
			.then((response) => {
				console.log(response);
				props.setForceUpdate(props.forceUpdate + 1);
			})
		}
		
		postLogs(element);
	}
	
	function goToReadOnly(element) {
		props.setCommitIdx(element.commitIdx);
		props.setReadOnly(1);
		// props.setForceUpdate(props.forceUpdate + 1);
	}
	
	return (
		<>
			{props.commitsInfo?.map(function(element, index) {
				return (
					<ul className={styles.historyUnorderedListTag} key={index}>
						<li>
							<p className={styles.historyMessage} onClick={() => {
								goToReadOnly(element);
							}}>{element.commitMessage}</p>
							
							<div className={styles.historyDateAndIcon}>
								<p className={styles.historyDate} onClick={() => {
									goToReadOnly(element);	
								}}>{element.createdAt.substring(2)}</p>
								
								<div className={styles.historyIcon}>
									<FontAwesomeIcon className={styles.readOnly} icon={faEye} onClick={() => {
										goToReadOnly(element);
									}}></FontAwesomeIcon>
									<FontAwesomeIcon className={styles.rollBack} style={{ marginLeft: '4px'}} icon={faArrowRotateLeft} onClick={() => {
										rollback(element);
									}}></FontAwesomeIcon>
								</div>
							</div>
						</li>
					</ul>
				)
			})}
		</>
	)
}

export default SideBar;