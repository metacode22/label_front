import './Landing.css';
import { useNavigate } from 'react-router-dom';
import LoginButton from "../Login/Login";
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

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
            <LoginButton></LoginButton>
            <img style={{width:'15rem', height:'15rem', marginTop: '10px', marginLeft: '190px'}} src={process.env.PUBLIC_URL + '/images/P0i7.gif'}/>
            <p style={{textAlign: 'center', fontSize: '12px', marginTop:'50px'}}>By continuing, you agree to Label's Terms of Service and Privacy Policy. </p>
        </div>
    )
}

export default Landing;