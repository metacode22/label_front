import { useCallback, useRef } from 'react'
import styles from './Popup.module.css'

export default function Popup(){

    const fileRef = useRef(null);
    const titleRef = useRef(null);
    const subTitleRef = useRef(null);
    const authorRef = useRef(null);

    async function fomrDateMake (e) {
        const formData = new FormData();
        const text = JSON.stringify({
            title : titleRef.current.value,
            subTitle : subTitleRef.current.value,
            author : authorRef.current.value
        });

        formData.append('files', e.target.files[0]);
        formData.append('body', text);
        
        return formData
    };

    const uploadFile = useCallback(async (e)=>{
        if(!e.target.files){
            return;
        }

        // console.log(e.target.files[0]);
        // console.log(titleRef.current.value);
        // console.log(subTitleRef.current.value);
        // console.log(authorRef.current.value);

        const formData = await fomrDateMake(e);
        
        await fetch(`http://localhost:3000/upload`,{
            method:'post',
            body : formData
        })
    },[])

    const clickUpload = useCallback(()=>{
        if (!fileRef.current){
            return;
        }
        fileRef.current.click();
    },[])
    
    return (
        <div className={styles.popWrap}>
            <div className={styles.popBox}>
                <article className={styles.article}>
                    <p className={styles.pTitle}>My Book</p>
                    <p className={styles.pSubTitle}>파일 업로드</p>
                    <div className={styles.inputWrap}>
                        <label className={styles.label}>책 타이틀
                            <input ref={titleRef} className={styles.input} type='text' placeholder='제목을 입력해주세요.'></input>
                        </label>
                        <label className={styles.label}>서브 타이틀
                            <input ref={subTitleRef} className={styles.input} type='text' placeholder='부제목을 입력해주세요.'></input>
                        </label>
                        <label className={styles.label}>저자명
                            <input ref={authorRef} className={styles.input} type='text' placeholder='저자명을 입력해주세요.'></input>
                        </label>
                    </div>
                </article>
                <aside className={styles.aside}>
                    <label className={styles.uploadLabel}>
                        <img className={styles.img} src={process.env.PUBLIC_URL + `/images/upload.png`}/>
                        <input type='file' accept='.pdf' className={styles.file} ref={fileRef} onChange={uploadFile}/>
                    </label>
                    <p style={{ color: '#3E4051', fontSize: '10px'}}>PDF 파일만 업로드가 가능합니다.</p>
                    <button className={styles.btn} onClick={clickUpload}>파일 저장</button>
                    <p style={{ color: '#3E4051', fontSize: '10px'}}>작성 및 파일 선택 후 저장 버튼을 눌러주세요.</p>
                </aside>
            </div>
        </div>
    )
}