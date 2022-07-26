import { useState } from 'react';
import styles from './SideBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

function SideBar(props) {
	let [sideBarStatus, setSideBarStatus] = useState(false);
	
	return (
		<>
			<div className={styles.sideBarContents} style={sideBarStatus === true ? {} : {display: 'none'}}>
				<div className={styles.bookInfo}>
					<div className={styles.bookImage} style={{backgroundImage: "url(" + `${process.env.PUBLIC_URL + `${props.currentBookInfo.firstPageLink}`}`}}></div>
					<p className={styles.bookTitle}>{props.currentBookInfo.pdfName}</p>
				</div>
				<hr style={{ width: '100%', margin: 0}}></hr>
				<div className={styles.historyList}>history</div>
				<div className={styles.historyInput}>
					<input></input>
				</div>
			</div>
			<FontAwesomeIcon icon={sideBarStatus === true ? faAngleLeft : faAngleRight} className={styles.sideBarToggleButton} onClick={() => {setSideBarStatus(!sideBarStatus);}}></FontAwesomeIcon>
		</>
	)
}

export default SideBar;

// backgroundImage: "url(" + `${process.env.PUBLIC_URL + `${firstPageLink}`}`,
// backgroundPosition: "center",
// backgroundSize: "cover",
// backgroundRepeat: "no-repeat"