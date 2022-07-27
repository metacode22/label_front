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
                <section className={styles.section}>
                    <div style={{ marginLeft: '55px', marginBottom: '5px'}}><h2>Recently Read</h2></div>
                    <div className={styles.bookList}>
                        <RecentBookList result={result}></RecentBookList>
                    </div>
                </section>
                <section className={styles.section}>
                    <div style={{ marginLeft: '55px', marginBottom: '5px'}}><h2>How about this one?</h2></div>
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

const RecentBookList = (props)=>{
    // console.log(props)
    const rendering = () => {
        const result = Array();

        for (let i = 0; i < 4; i++){
            result.push(<RecentBook key={i} result={props.result[i]}></RecentBook>);
        }
        return result;
    }
    return rendering()//여기가 지금 4개만 표시하게끔 로직을 바꿔야 하는데, 마운트 될 떄 한 번은 되고 이후가 안되고 에러가 뜨고 있음.
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

const RecentBook = ({firstPageLink,pdfName})=>{
    let navigate = useNavigate();
    console.log(firstPageLink);

    return (
        <div className={styles.bookContainer}>
            <div onClick={()=>{navigate('/personalreading')}} className={styles.book} style={{
                backgroundImage: "url(" + `${process.env.PUBLIC_URL + `${firstPageLink}`}`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }}/>
            <div className={styles.bookInfo}>
                <div className={styles.pdfName}>{pdfName}</div>
                <div>Reading P.recently read page </div>
                {/* <ReadingPage/> */}
            </div>
        </div>
    )
}

const ReadingPageList = ()=>{
    let [result, setResult] = useState([]);

    let pdfIdx = 1;

    useEffect(()=>{
        fetch(`http://43.200.26.215:3000/`)
        .then(res => {
            return res.json();
        })
        .then(res => {
            setResult(res.result);
            // console.log(res.result);
        })
    }, []);

    return(
        <ReadingPage result={result} length={result.length}></ReadingPage>
    )
    //이거 recent page로 바꿔야 하는데 아직 api가 준비가 안됨
}

const ReadingPage = (props)=>{
    const rendering = ()=>{
        const result = Array();

        for (let i = 0; i < props.lengtth; i++){
            result.push(<div>Reading P.{props.result[i].recentlyReadPage} </div>)
        }
    }
}