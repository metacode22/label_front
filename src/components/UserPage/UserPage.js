import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserPage.css'

function CommitGrass(){
    let [result, setResult] = useState([]);    

    useEffect(() => {
        // let userIdx = 5;
        fetch(`http://localhost:3000/login/testbutton`) //실제 서버에서 받으면 개인 유저 1명만 부를 수 있게
        .then(res=>{
            return res.json()
        })
        .then(res=>{
            setResult(res.result);
            // console.log(res.result);
        })
    }, [])

    return (
        <div className="graph">
            <ul className="months">
                <li>Jan</li>
                <li>Feb</li>
                <li>Mar</li>
                <li>Apr</li>
                <li>May</li>
                <li>Jun</li>
                <li>Jul</li>
                <li>Aug</li>
                <li>Sep</li>
                <li>Oct</li>
                <li>Nov</li>
                <li>Dec</li>
            </ul>
            <ul className="days">
                <li>Sun</li>
                <li>Mon</li>
                <li>Tue</li>
                <li>Wed</li>
                <li>Thu</li>
                <li>Fri</li>
                <li>Sat</li>
            </ul>
            <ul className="squares">
                <CommitGrassShow date={result} length={result.length}></CommitGrassShow>
            </ul>
        </div>
    )
}

const CommitGrassShow = (props) => {

    if (props.date.length != 0) {

        const rendering = () => {
            const result = Array();

            //실제 서버로 한 사람씩 조회하면 데이터는 1명씩만 뜰테니까, 원래라면 date만 쓰면 될듯?
            for (let i = 0; i<365; i++){
                if (props.date[0].commitGrass[i] !== '0'){ // 1일 때만 들어가게
                    result.push(<li key={i} data-level={1}></li>)
                } else if (props.date[0].commitGrass[i] == '0') { //0이라면 빈 값이 들어가게
                    result.push(<li key={i} ></li>)
                }
            }
            return result;
        }
        return rendering()
    }
}

const UserBookList = ()=>{
    let [result, setResult] = useState([]);

    let userIdx = 1;

    useEffect(()=>{
        fetch(`http://3.35.27.172:3000/users/${userIdx}/pdfs`)
        .then(res=>{
            return res.json()
        })
        .then(res=>{
            setResult(res.result);
            console.log(res.result);
        })
    }, [])

    return (
        <UserBookShow list={result} length={result.length}></UserBookShow>
    )
}

const UserBookShow = (props)=>{
    let navigate = useNavigate();

    const rendering = ()=>{
        const result = Array();

        //현재는 index가 하나밖에 없어서 코드가 이렇습니다. 그리고 나중에 navigate 여러권이 되면 highlight 몇번째로 보낼지도 해야합니다.
        // key값도 넣어줘야함
        result.push(
            <p className='User__book__list' onClick={()=>{navigate(`/highlight`)}}>{props.list.pdfName}</p>
        )
        return result
    }
    return rendering()
}

function UserPage(){
    const [UserName, setUserName] = useState('5in9u')
    const [UserBio, setUserBio] = useState('Book is my life📚')
    const [UserEmail, setUserEmail] = useState('5in9u@gmail.com')

    const [Disable, setDisable] = useState(false);
    const ChangeInput1 = (e)=>{
        setUserName(e.target.value)
    }
    const ChangeInput2 = (e)=>{
        setUserBio(e.target.value)
    }
    const ChangeInput3 = (e)=>{
        setUserEmail(e.target.value)
    }
    const ChangeDisable = ()=>{
        setUserName(()=>setUserName(''))
        setUserBio(()=>setUserBio(''))
        setUserEmail(()=>setUserEmail(''))
        setDisable((current)=>!current)
    }

    // 밑에가 기본 아바타 이미지 창
    // const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    const [Image, setImage] = useState("https://blog.kakaocdn.net/dn/k3zUb/btrHSzU2GD1/wFGBTGPD5VF0jDtvnL5lD1/img.png")
    const fileInput = useRef(null)

    const onChange = (e) => {
        if(e.target.files[0]){
                setImage(e.target.files[0])
            }else{ //업로드 취소할 시 기본으로 바뀌게 했는데, {Image}로 하면 기존의 것으로 바뀔까?
                setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
                return
            }
            //화면에 프로필 사진 표시
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2){
                    setImage(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
    }

    //commit push하는 곳
    const onSubmit = (e)=>{
        e.preventDefault();
        console.log(CommitPush.current.value);

        fetch(`http://3.35.27.172:3000/commits`, {
            method: 'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pdfIdx: 1,
                commitMessage: CommitPush.current.value
            })
        }).then(res => {
            if (res.ok) {
                // console.log(res)
                alert('commit push!')
            }
        })
    }
    
    const CommitPush = useRef(null);
    
    return (
        <main className='UserPage__main'>
            <aside className='Profile__edit'>
                <img src={Image} id='Default__profile__image' onClick={()=> {fileInput.current.click()}}></img>
                <input type='file' style={{display: 'none'}} accepet='image/*' name='profile_img' onChange={onChange} ref={fileInput}></input>
                <p className='Userpage__default__information'>Name</p>
                <input disabled={!Disable} onChange={ChangeInput1} className='Userpage__default' value={Disable ? UserName : UserName}></input>
                {/* ↑수정을 해야하는 게, 수정하고 등록버튼을 눌렀을 때는 수정한 이름이 들어와야 함.. 이것도 데이터를 받는 건가? */}
                <p className='Userpage__default__information'>Bio</p>
                <input disabled={!Disable} onChange={ChangeInput2} className='Userpage__default' value={Disable ? UserBio : UserBio}></input>
                <p className='Userpage__default__information'>Email</p>
                <input disabled={!Disable} onChange={ChangeInput3} className='Userpage__default' value={Disable ? UserEmail : UserEmail}></input>
                <p></p>
                {/* <button type='submit' onClick={ChangeDisable} className='Userpage__edit__profile'>{!Disable ? '프로필 수정' : '프로필 등록'}</button> */}
            </aside>
            <article className='User__book'>
                <section className='User__book__section'>
                    <div className='User__book__menu'>My Library</div>
                    <UserBookList></UserBookList>
                    {/* 현재 있는 책이 적어서 적어둔 란 (밑에는) */}
                    <p className='User__book__list'>받은 책 이름</p>
                    <p className='User__book__list'>받은 책 이름</p>
                    <p className='User__book__list'>받은 책 이름</p>
                </section>
                <section>
                    <form onSubmit={onSubmit} className='User__grass__from'>
                        <input ref={CommitPush} placeholder='input commit message...'></input>
                        <button id='User__grass__btn' type='submit'>push</button> {/* formaction 서버에 보내게 url쓰면 전송되지 않을까? */}
                    </form>
                    <CommitGrass></CommitGrass>
                </section>
            </article>
        </main>
    );
}

export default UserPage;