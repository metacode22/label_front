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
        } else if(!titleRef.current.value){
            return;
        }

        const formData = await fomrDateMake(e);
        
        await fetch(`https://inkyuoh.shop/upload`,{
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
                        <label className={styles.label}>📌책 타이틀
                            <input ref={titleRef} className={styles.input} type='text' placeholder='제목을 입력해주세요.'></input>
                        </label>
                        <label className={styles.label}>서브 타이틀(option)
                            <input ref={subTitleRef} className={styles.input} type='text' placeholder='부제목을 입력해주세요.'></input>
                        </label>
                        <label className={styles.label}>저자명(option)
                            <input ref={authorRef} className={styles.input} type='text' placeholder='저자명을 입력해주세요.'></input>
                        </label>
                    </div>
                </article>
                <aside className={styles.aside}>
                    <input type='file' accept='.pdf' className={styles.file} ref={fileRef} onChange={uploadFile}/>
                    <p className={styles.p}>
                        <h3><b>🚫주의사항</b>🚫</h3><br/>
                        1. <b style={{color: 'red'}}>PDF 파일</b>만 업로드가 가능합니다.<br/>
                        2. <b style={{color: 'red'}}>제목 작성</b> 후 파일 선택을 눌러주세요.<br/>
                        → 작성하지 않을 시 파일이 업로드 되지 않습니다!
                    </p>
                    <button className={styles.btn} onClick={clickUpload}>파일 업로드</button>
                </aside>
            </div>
        </div>
    )
}