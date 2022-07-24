import styles from './Library.module.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Library(){   
    let [result,setResult] = useState([]);

    let userIdx = 1;

    useEffect(()=>{
        fetch(`http://43.200.26.215:3000/users/${userIdx}/pdfs`)
        .then(res=>{
            return res.json()
        })
        .then(res=>{
            setResult(res.result);
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    return(
        <main className={styles.main}>
            <label className={styles.label}>+ Upload
                <input style={{display:'none'}} type='file'/>
            </label>
            <article>
                <section className={styles.section}>
                    <div style={{ marginLeft: '65px', marginBottom: '5px'}}><h2>Recently Read</h2></div>
                    <div className={styles.bookList}>
                        <BookList result={result}></BookList>
                    </div>
                </section>
                <section className={styles.section}>
                    <div style={{ marginLeft: '65px', marginBottom: '5px'}}><h2>How about this one?</h2></div>
                    <div className={styles.bookList}>
                        <BookList result={result} length={result.length}></BookList>
                    </div>
                    
                    {/* <div className={styles.bookList}>
                        <BookList result={result} length={result.length}></BookList>
                    </div>
                    <div className={styles.bookList}>
                        <BookList result={result} length={result.length}></BookList>
                    </div>
                    <div className={styles.bookList}>
                        <BookList result={result} length={result.length}></BookList>
                    </div> */}

                </section>
            </article>
        </main>
    )
}

const BookList = (props)=>{
    const rendering = () => {
        const result = Array();
        
        for (let i = 0; i < props.result.length; i++) {
            result.push(<Book key={i} result={props.result[i]}></Book>);
        }
        return result;
    }
    return rendering()
}

const Book = (props)=>{
    let navigate = useNavigate();
    // console.log(props);

    return (
        <>
            <div onClick={()=>{navigate('/personalreading')}} className={styles.book} style={{
                backgroundImage: "url(" + `${process.env.PUBLIC_URL + `${props.result.firstPageLink}`}`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }}/>
            <div className={styles.bookInfo}>
                <div className={styles.pdfName}>{props.result.pdfName}</div>
                <div>Reading P.recently read page </div>
                {/* <div>Reading P.{props.result.recentlyReadPage}</div> */}
                {/* 여기 ↑ 다시 생각해야할지도? 주소가 다르다고 합니다 */}
            </div>
        </>
    )
}