import styles from './Library.module.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';





export default function Library(){   
    let [result,setResult] = useState([]);
    let [allBook,setAllBook] = useState([]);

    let userIdx = 58;

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

    useEffect(() =>{
        fetch(`http://43.200.26.215:3000/pdfs`)
        .then(res=>{
            return res.json()
        })
        .then(res=>{
            setAllBook(res.result);
            // console.log(res);
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
                <section className={styles.sectionTitle}>
                    <p style={{ fontSize: '40px', fontWeight: 'bold'}}>MY LIBRARY</p>
                    <p className={styles.p}>최근에 읽었던 책 또는 한 번이라도 열어봤던 책 리스트입니다. 오늘도 Label과 즐거운 책 읽기를 해보세요.</p>
                    <label className={styles.search}>
                        <img className={styles.searchImg} src={process.env.PUBLIC_URL + '/images/search.png'}></img>
                        <input type='text' className={styles.searchInput} placeholder='찾고 싶은 책 이름 또는 제목을 입력해보세요.'></input>
                    </label>
                </section>
                <section className={styles.section}>
                    <div className={styles.divText}><h2>Recently Read</h2></div>
                    <div className={styles.bookList}>
                        <RecentBookList result={result}></RecentBookList>
                    </div>
                </section>
                <section className={styles.section}>
                    <div className={styles.divText}><h2>How about this one?</h2></div>
                    <div className={styles.bookList}>
                        <BookList result={allBook} length={allBook.length}></BookList>
                    </div>
                </section>
            </article>
        </main>
    )
}

const BookList = (props)=>{
    // console.log(props.result)
    const rendering = () => {
        const result = Array();
        
        for (let i = 0; i < props.result.length; i++) {
            result.push(<Book key={i} result={props.result[i]}></Book>);
        }
        return result;
    }
    return rendering()
}

const RecentBookList = (props)=>{
    // console.log(props.result)
    const rendering = () => {
        const result = Array();

        for (let i = 0; i < 4; i++){
            result.push(<RecentBook key={i} result={props.result[i]}></RecentBook>);
        }
        return result;
    }
    return rendering()
}

const Book = (props)=>{
    let navigate = useNavigate();
    // console.log(props);

    return (
        <div className={styles.bookContainer}>
            <div onClick={()=>{navigate('/personalreading')}} className={styles.book} style={{
                backgroundImage: "url(" + `${process.env.PUBLIC_URL + `${props.result.firstPageLink}`}`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }}/>
            <div className={styles.bookInfo}>
                <div className={styles.pdfName}>{props.result.pdfName}</div>
                <div className={styles.author}>{props.result.author}</div>
            </div>
        </div>
    )
}

const RecentBook = (props)=>{
    let navigate = useNavigate();

    return (
        <div className={styles.bookContainer}>
            <div onClick={()=>{navigate('/personalreading')}} className={styles.book} style={{
                backgroundImage: "url(" + `${process.env.PUBLIC_URL + `${props.result?.firstPageLink}`}`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }}/>
            <div className={styles.bookInfo}>
                <div className={styles.pdfName}>{props.result?.pdfName}</div>
                <div className={styles.author}>{props.result?.author}</div>
            </div>
        </div>
    )
}