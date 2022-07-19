import './Landing.css';
import { useNavigate } from 'react-router-dom';
import LoginButton from "../Login/Login";
import LogoutButton from "../Logout/Logout";
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import axios from 'axios';

const clientId = "175615424044-eqrukop3k2spabpknd63vtm2kqtiff91.apps.googleusercontent.com";

function Landing() {    
    return (
        <main className="Landing__main">
            <article className="Landing__article">
            </article>
            <aside className='Landing__aside'>
                <LoginTemp></LoginTemp>
            </aside>
        </main>
    );
}

function LoginTemp() {
    let navigate = useNavigate();
    
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: "",
            });
        }
        
        gapi.load('client:auth2', start);
    });
    
    return (
        <div className="Landing__login">
            <h1 className="Landing__login--loginText">Log In</h1>
            {/* <div className="Landing__login--socialLogin"> */}
                {/* <img src={process.env.PUBLIC_URL + '/images/google_login_icon.png'} id='Google__login__icon'></img> */}
                {/* <div>&nbsp;&nbsp;log in with Google</div> */}
                <LoginButton></LoginButton>
                <LogoutButton></LogoutButton>
            {/* </div> */}
            <div className="Landing__login--or">or</div>
            <form action="" method="" className="Landing__login__form">
                <label>
                    <input type="email" placeholder="  Email" className="Landing__login--input"></input>
                </label>
                <label>
                    <input type="password" placeholder="  Password" className="Landing__login--input"></input>
                </label>
                <button type="submit" className="Landing__login--button" onClick={() => { navigate('/library') }}>Log In</button>
            </form>
            <p style={{textAlign: 'center', fontSize: '12px'}}>By continuing, you agree to Label's Terms of Service and Privacy Policy. </p>
        </div>
    )
}

export default Landing;