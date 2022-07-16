import { useState, useRef } from 'react';
import './UserPage.css'

function UserGrass(){
    // const squares = document.querySelector('.squares');
    // for (let i = 1; i < 365; i++) {
    // const level = Math.floor(Math.random() * 3);  
    // squares.insertAdjacentHTML('beforeend', `<li data-level="${level}"></li>`);
    // }
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
            <ul className="squares"></ul>
        </div>
    )
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

    const [UserBook, setUserBook] = useState(['받은 책들 이름들'])

    const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
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
    
    return (
        <main className='UserPage__main'>
            <aside className='Profile__edit'>
                <img src={Image} id='Default__profile__image' onClick={()=> {fileInput.current.click()}}></img>
                <input type='file' style={{display: 'none'}} accepet='image/*' name='profile_img' onChange={onChange} ref={fileInput}></input>
                {/* <button className='Profile__edit__btn'>프로필 수정</button> */}
                <p className='Userpage__default__information'>Name</p>
                <input disabled={!Disable} onChange={ChangeInput1} className='Userpage__default' value={Disable ? UserName : UserName}></input>
                <p className='Userpage__default__information'>Bio</p>
                <input disabled={!Disable} onChange={ChangeInput2} className='Userpage__default' value={Disable ? UserBio : UserBio}></input>
                <p className='Userpage__default__information'>Email</p>
                <input disabled={!Disable} onChange={ChangeInput3} className='Userpage__default' value={Disable ? UserEmail : UserEmail}></input>
                <p></p>
                <button disabled={Disable} onClick={ChangeDisable} className='Userpage__edit__profile'>{!Disable ? '프로필 수정' : '프로필 등록'}</button>
            </aside>
            <article className='User__book'>
                <section className='User__book__section'>
                    <div className='User__book__menu'>My Library</div>
                    <p className='User__book__list'>{UserBook}</p>
                    <p className='User__book__list'>{UserBook}</p>
                    <p className='User__book__list'>{UserBook}</p>
                    <p className='User__book__list'>{UserBook}</p>
                    <p className='User__book__list'>{UserBook}</p>
                </section>
                <section className='User__glass'>
                    <UserGrass></UserGrass>
                </section>
            </article>
        </main>
    );
}

export default UserPage;