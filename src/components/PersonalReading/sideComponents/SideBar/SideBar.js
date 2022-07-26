import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './SideBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

function SideBar(props) {
	let [sideBarStatus, setSideBarStatus] = useState(true);
	let [history, setHistory] = useState([]);
	
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
					<input className={styles.historyInput} placeholder={'기록을 남기세요.'}></input>
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
				<ul>
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

// backgroundImage: "url(" + `${process.env.PUBLIC_URL + `${firstPageLink}`}`,
// backgroundPosition: "center",
// backgroundSize: "cover",
// backgroundRepeat: "no-repeat"