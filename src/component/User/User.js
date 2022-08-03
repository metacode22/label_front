import styles from './User.module.css'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleOnHistory, toggleOffHistory, changeCommitInfo } from '../../store';

export default function User(){
    let onOffHistory = useSelector((state) => {return state.onOffHistory});

    return(
        <main className={styles.main}>
            <article>
                <section>
                    <div className={styles.divText}><h2>My Page</h2></div>
                    <div className={styles.profile}>
                        <UserProfile></UserProfile>
                    </div>
                    <div>
                        <p className={styles.grassP}>Your commit history</p>
                        <Grass></Grass>
                    </div>
                    { onOffHistory ? <div className={styles.divHistory}>
                        <CommitShow></CommitShow>
                    </div> : null}
                </section>
                <img className={styles.lineImg} src={process.env.PUBLIC_URL + `/images/line.png`}></img>
                <section>
                    <div className={styles.divText}><h2>My Library</h2></div>
                    {/* <form className={styles.form}>
                        <button className={styles.button}>삭제</button>
                    </form> */}
                    <div className={styles.divTable}>
                        <table>
                            <thead className={styles.thead}>
                                <tr>
                                    {/* <th><input type='checkbox'/></th> */}
                                    <th className={styles.th}>Title</th>
                                    <th className={styles.th}>Page</th>
                                    <th className={styles.th}>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Tr></Tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </article>
        </main>
    )
}

const UserProfile = ()=>{

    const [result, setResult] = useState([]);

    useEffect(()=>{
        fetch(`https://inkyuoh.shop/userInfo`)
        .then((res) => {
            return res.json();
        })
        .then((res)=>{
            setResult(res.result);
            // console.log(res.result);
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    return(
        <UserProfileShow result={result} length={result.length}></UserProfileShow>
    )
}

const UserProfileShow = (props)=>{
    // console.log(props.result)
    return(
        <>
            <img className={styles.profileImg} src={`${props.result[0]?.userPhoto}`}/>
            <div className={styles.profileInfo}>
                <p>My Profile</p>
                <p className={styles.namep}>{props.result[0]?.userName}</p>
                <p>{props.result[0]?.userEmail}</p>
            </div>
        </>
    )
}

const CommitShow = ()=>{

    let commitInfo = useSelector((state) => state.commitInfo);
    // console.log(commitInfo);

    const rendering = ()=>{
        const result = Array();

        for (let i = 0; i < commitInfo.length; i++){
            // console.log(commitInfo[i]);
            result.push(
                <ul>
                    <li className={styles.commitLi}>{commitInfo[i].bookName}</li>
                    <p className={styles.commitp}>{commitInfo[i].commitMessage}</p>
                    <p className={styles.commitDate}>{commitInfo[i].createdAt}</p>
                </ul>
            )
        }
        return result;
    }
    return rendering()
}

const Tr = ()=>{
    const [result, setResult] = useState([]);

    let userIdx = 58;

    useEffect(()=>{
        fetch(`https://inkyuoh.shop/users/${userIdx}/pdfs`)
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
    },[]);

    return (
        <BookList result={result} length={result.length}></BookList>
    )
}

const BookList = (props)=>{

    const rendering = ()=>{
        const result = Array();

        for (let i = 0; i < props.result.length; i++){
            result.push(
                <tr>
                    {/* <td className={styles.tdCheck}><input type='checkbox'/></td> */}
                    <td className={styles.tdTitle}>{props.result[i].pdfName}</td>
                    <td className={styles.td}>{props.result[i].recentlyReadPage} / {props.result[i].totalPage}</td>
                    <td className={styles.td}>{props.result[i].updatedAt}</td>
                </tr>
            )
        }
        return result;
    }
    return rendering()
}

function Grass() {
    let [result, setResult] = useState([]);

    useEffect(() => {
        // let userIdx = 5;
        fetch(`https://inkyuoh.shop/userInfo`)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setResult(res.result);
                // console.log(res.result);
            });
    }, []);

    return (
        <div className={styles.graph}>
            <ul className={styles.squares}>
                <GrassShow date={result} length={result.length}></GrassShow>
            </ul>
        </div>
    );
}

const GrassShow = (props) => {
    let dispatch = useDispatch();

    if (props.date.length != 0) {
        const rendering = () => {
            const result = Array();

            for (let i = 1; i < 365; i++) {
                if (props.date[0].commitGrass[i] !== "0") {
                    result.push(<li key={i} date={subtractDays(-i+364, new Date())} data-level={1} onClick={() => {
                        dispatch(toggleOnHistory());
                        let day = subtractDays(-i+364, new Date());
                        fetch(`http://43.200.26.215:3000/commits/daily/date/${day}`)
                        .then(res=>{
                            return res.json()
                        })
                        .then(res=>{
                            dispatch(changeCommitInfo(res.result));
                        })
                    }}></li>);
                } else if (props.date[0].commitGrass[i] == "0") {
                    result.push(<li key={i} date={subtractDays(-i+364, new Date())} onClick={()=>{
                        dispatch(toggleOffHistory());
                    }}></li>);
                }
            }
            return result;
        };
        return rendering();
    }
};

function subtractDays(numOfDays, date = new Date()) {
    date.setDate(date.getDate() - numOfDays);
    
    const calculDate = date.getFullYear() + "-" + (date.getMonth()+1) + '-' + date.getDate()

    return calculDate;
};