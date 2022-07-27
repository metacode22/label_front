import styles from './Login.module.css'
import { useNavigate } from 'react-router'
import { useRef } from 'react';

// social login
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { useCookies } from 'react-cookie';

const clientId = "432604043005-ha7dq6k3unqersiaciethfdi8tr2lcr0.apps.googleusercontent.com";

export default function Login(props){
    const [cookies, setCookie, removeCookie] = useCookies(['sessionID_label']);
    const navigate = useNavigate()
    let email = useRef();
    let password = useRef();

    function doLogin(event) {
        event.preventDefault();
        axios.post('http://localhost:3001/login', {
            userEmail: email.current.value,
            userPW: password.current.value
        })
        .then((response) => {
            setCookie('sessionID_label', response.data.result);
            navigate('/library');
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <main className={styles.main}>
            <article className={styles.article}>
                <img className={styles.img} src={process.env.PUBLIC_URL + `/images/examLogin.png`}></img>
            </article>
            <aside className={styles.aside}>
                <div>
                    <p style={{ fontSize: '16px'}}>Welcome back</p>
                    <p style={{ fontSize: '29px', fontWeight: 'bold', marginTop: '1%'}}>Login to Your account</p>
                </div>
                <form className={styles.form}>
                    <label>
                        <p className={styles.p}>Email</p>
                        <input ref={email} className={styles.input} type='email'/>
                    </label>
                    <label>
                        <p className={styles.p}>Password</p>
                        <input ref={password} className={styles.input} type='password'/>
                    </label>
                    {/* <label>
                        <p className={styles.p}>Name</p>
                        <input className={styles.input} type='text'/>
                    </label> */}
                    <button className={styles.buttonLogin} onClick={(event) => {
                        doLogin(event);
                    }}>Login</button>
                    {/* <button className={styles.buttonGoogle}>Login with Google</button> */}
                    <SocialLogin></SocialLogin>
                </form>
                <p className={styles.pBottom}>Don't have an account? <a className={styles.a} onClick={()=>{navigate('/signup')}}>Join free today!</a></p>
            </aside>
        </main>
    )
}

function SocialLogin() {
    const [cookies, setCookie, removeCookie] = useCookies(['id']);
    let navigate = useNavigate();
    
    const onSuccess = (response) => {
        console.log(response.accessToken);
        
        axios.post('http://localhost:3001/socialLogin', {
            tokens: response.accessToken
        })
        .then((response) => {
            setCookie('sessionID_label', response.data.result);
            console.log(response);
            navigate('/library');
        })
        .catch((error) => {
            console.log(error);
        })
        
    }
    
    const onFailure = (response) => {
        console.log("LOGIN FAILED! response: ", response);
    }

    return (
        <div id="signInButton" style={{textAlign: 'center', marginTop:'50px'}}>
            <GoogleLogin 
                clientId={clientId}
                buttonText="Log in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={false}
            />
        </div>
    )
}