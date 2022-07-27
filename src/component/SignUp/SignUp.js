import styles from './SignUp.module.css'
import { useRef } from 'react';
import { TempleBuddhist } from '@mui/icons-material';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

export default function SignUp(){
    const [cookies, setCookie, removeCookie] = useCookies(['sessionID_label']);
    let navigate = useNavigate();
    let email = useRef();
    let password = useRef();
    let name = useRef();

    // "userName" :"오연규", 
    // "userEmail" :"dhdusrb@naver.com", 
    // "userPW" : "1234"
    
    function doSignUp(event) {
        event.preventDefault();
        axios.post(`http://127.0.0.1:3001/signup`, {
            userName: name.current.value,
            userEmail: email.current.value,
            userPW: password.current.value
        })
        .then((response) => {
            console.log('Sign Up response:', response);
            setCookie('sessionID_label', response.data.result);
            navigate('/library');
        })
        .catch((error) => {
            console.log('Sign Up Fail, error:', error);
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
                    <p style={{ fontSize: '29px', fontWeight: 'bold', marginTop: '1%'}}>Sign up Your account</p>
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
                    <label>
                        <p className={styles.p}>Name</p>
                        <input ref={name} className={styles.input} type='text'/>
                    </label>
                    <button className={styles.buttonLogin} onClick={(event) => {
                        doSignUp(event);
                    }}>Sign up</button>
                    <button className={styles.buttonGoogle}>Sign up with Google</button>
                </form>
                <p className={styles.pBottom}>By continuing you agree to Label's Terms of Service and Privacy Policy.</p>
            </aside>
        </main>
    )
}