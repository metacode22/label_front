import styles from './Popup.module.css'

export default function Popup(props){
    const { onClose } = props;
    
    return (
        <div className={styles.popWrap}>
            <div className={styles.popBox}>
                <article className={styles.article}>
                    <p className={styles.pTitle}>My Book</p>
                    <p className={styles.pSubTitle}>파일 업로드</p>
                    <div className={styles.inputWrap}>
                        <label className={styles.label}>책 타이틀
                            <input className={styles.input} type='text' placeholder='제목을 입력해주세요.'></input>
                        </label>
                        <label className={styles.label}>서브 타이틀
                            <input className={styles.input} type='text' placeholder='부제목을 입력해주세요.'></input>
                        </label>
                        <label className={styles.label}>저자명
                            <input className={styles.input} type='text' placeholder='저자명을 입력해주세요.'></input>
                        </label>
                    </div>
                </article>
                <aside className={styles.aside}>
                    <label className={styles.uploadLabel}>
                        <img className={styles.img} src={process.env.PUBLIC_URL + `/images/upload.png`}/>
                        <input type='file' accept='.pdf' className={styles.file}/>
                        <p style={{ color: '#3E4051', fontSize: '10px'}}>🚫 PDF 파일만 업로드가 가능합니다! 🚫</p>
                    </label>
                </aside>
            </div>
        </div>
    )
}