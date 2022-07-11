import { useState } from 'react';
import './UserPage.css'

function UserPage(){
    const [UserName, setUserName] = useState('5in9u');
    const [UserBio, setUserBio] = useState('Book is my life📚')
    const [UserEmail, setUserEmail] = useState('5in9u@gmail.com')
    
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
                <section className='User__book__list'></section>
                <section className='User__glass'></section>
            </article>
        </main>
    );
}

export default UserPage;