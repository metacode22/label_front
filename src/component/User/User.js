import styles from './User.module.css'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleOnOffHistory } from '../../store';

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
                    { onOffHistory === true ? <div className={styles.divHistory}>
                        <CommitHistory></CommitHistory>
                    </div> : null}
                </section>
                <img className={styles.lineImg} src={process.env.PUBLIC_URL + `/images/line.png`}></img>
                <section>
                    <div className={styles.divText}><h2>My Library</h2></div>
                    <form className={styles.form}>
                        <button className={styles.button}>삭제</button>
                    </form>
                    <div className={styles.divTable}>
                        <table>
                            <thead className={styles.thead}>
                                <tr>
                                    <th><input type='checkbox'/></th>
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
    })

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

const CommitHistory = ()=>{

    const [result, setResult] = useState([]);
    
    useEffect(()=>{
        fetch(`https://inkyuoh.shop/commits/users/58`)
        .then(res=>{
            return res.json()
        })
        .then(res=>{
            setResult(res.result);
        })
        .catch((err) => {
            console.log(err);
        })
    })

    return(
        <CommitShow result={result} length={result.length}></CommitShow>
    )
}

const CommitShow = (props)=>{

    // console.log(props.result)

    const rendering = ()=>{
        const result = Array();

        for (let i = 0; i < props.result.length; i++){
            result.push(
                <ul>
                    {/* 밑에거 제목 뜨게 하고 싶으면 커밋 db에 제목도 추가해야할 것 같습니다~ */}
                    <li className={styles.commitLi}>메타버스</li>
                    <p className={styles.commitp}>{props.result[i].commitMessage}</p>
                    <p className={styles.commitDate}>{props.result[i].createdAt}</p>
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
    });

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
                    <td className={styles.tdCheck}><input type='checkbox'/></td>
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
        fetch(`https://inkyuoh.shop/userInfo`) //실제 서버에서 받으면 개인 유저 1명만 부를 수 있게
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

            // index 이용해서 날짜별로 뜨게 한다?? 이거 설명 다시 들어야할듯 ㅠㅠ
            //실제 서버로 한 사람씩 조회하면 데이터는 1명씩만 뜰테니까, 원래라면 date만 쓰면 될듯?
            for (let i = 1; i < 365; i++) {
                if (props.date[0].commitGrass[i] !== "0") {
                    // 1일 때만 들어가게
                    result.push(<li key={i} index={i} data-level={1} onClick={() => {
                        dispatch(toggleOnOffHistory());
                    }}></li>);
                } else if (props.date[0].commitGrass[i] == "0") {
                    //0이라면 빈 값이 들어가게
                    //이후에 매칭을 날짜별로 시키게 된다면, 이 토글도 눌렀을 때 널값이 뜨게끔 해야하지 않을까? 흐음??
                    result.push(<li key={i} index={i}></li>);
                }
            }
            return result;
        };
        return rendering();
    }
};

/* 마이 라이브러리에 삭제 버튼 구현
   라이브러리에 타이틀 누르면 해당 책으로 이동해야 하는지?
   지금 유저 1명만 불러오고 있음 -> 여러 유저를 조회할 수 있게 바꿔야 함 */