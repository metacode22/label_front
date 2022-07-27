import styles from './User.module.css'
import { useState, useEffect } from 'react';

export default function User(){
    return(
        <main className={styles.main}>
            <article>
                <section>
                    <div className={styles.divText}><h2>My Page</h2></div>
                    {/* 사진 정보 받아와야 함 */}
                    <div className={styles.profile}>
                        <img className={styles.profileImg} src={'https://label-book-storage.s3.ap-northeast-2.amazonaws.com/default_profile.png'}/>
                        <div className={styles.profileInfo}>
                            <p>My Profile</p>
                            {/* ↓ 정보 받아와야 함 */}
                            <p className={styles.namep}>Oin9u</p>
                            <p>lol1219@snu.ac.kr</p>
                        </div>
                    </div>
                    <div>
                        <p className={styles.grassP}>Your commit history</p>
                        <Grass></Grass>
                    </div>
                    <div>
                        <p className={styles.commitDate}>2022.07.28 - data load plz</p>
                        <CommitHistory></CommitHistory>
                        <CommitHistory></CommitHistory>
                        <CommitHistory></CommitHistory>
                    </div>
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
                                <Tr></Tr>
                                <Tr></Tr>
                                <Tr></Tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </article>
        </main>
    )
}

const CommitHistory = ()=>{
    return(
        <>
            <ul>
                <li className={styles.commitLi}>commit data 받아야함</li>
                <p className={styles.commitp}>today reading</p>
            </ul>
        </>
    )
}

const Tr = ()=>{
    return (
        <>
            <tr>
                <td className={styles.tdCheck}><input type='checkbox'/></td>
                <td className={styles.tdTitle}>title 데이터 받아야함</td>
                <td className={styles.td}>page 데이터 받아야함</td>
                <td className={styles.td}>date 데이터 받아야함</td>
            </tr>
        </>
    )
}

function Grass() {
    let [result, setResult] = useState([]);

    useEffect(() => {
        // let userIdx = 5;
        fetch(`http://43.200.26.215:3000/userInfo`) //실제 서버에서 받으면 개인 유저 1명만 부를 수 있게
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
    if (props.date.length != 0) {
        const rendering = () => {
            const result = Array();

            //실제 서버로 한 사람씩 조회하면 데이터는 1명씩만 뜰테니까, 원래라면 date만 쓰면 될듯?
            for (let i = 1; i < 365; i++) {
                if (props.date[0].commitGrass[i] !== "0") {
                    // 1일 때만 들어가게
                    result.push(<li key={i} data-level={1}></li>);
                } else if (props.date[0].commitGrass[i] == "0") {
                    //0이라면 빈 값이 들어가게
                    result.push(<li key={i}></li>);
                }
            }
            return result;
        };
        return rendering();
    }
};