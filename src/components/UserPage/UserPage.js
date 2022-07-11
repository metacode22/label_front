import { useState } from 'react';
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
    const [UserName, setUserName] = useState('5in9u');
    const [UserBio, setUserBio] = useState('Book is my life📚')
    const [UserEmail, setUserEmail] = useState('5in9u@gmail.com')

    const [UserBook, setUserBook] = useState(['받은 책들 이름들'])
    
    return (
        <main className='UserPage__main'>
            <aside className='Profile__edit'>
                <img src={process.env.PUBLIC_URL + '/images/default_profile.png'} id='Default__profile__image'></img>
                <button type='button' id='Profile__edit__icon'/>                
                <input type='file' hidden={true}  id='my-input'/>
                <p>Name</p>
                <input type='text' placeholder={UserName}></input>
                <p>Bio</p>
                <input type='text' placeholder={UserBio}></input>
                <p>Email</p>
                <input type='text' placeholder={UserEmail}></input>
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