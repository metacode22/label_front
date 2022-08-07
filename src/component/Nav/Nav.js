import styles from './Nav.module.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Nav(props){
    const location = useLocation();
    const site = location.pathname;

    return(
        <>
            {site === '/' && <NavLogin></NavLogin>}
            {site === '/signup' && <NavLogin></NavLogin>}
            {site === '/library' && <NavDefault></NavDefault>}
            {site === '/userpage' && <NavDefault></NavDefault>}
            {site === '/personalreading' && <NavReading mode={props.mode} setMode={props.setMode}></NavReading>}
        </>
    )
}

function NavDefault(){
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['sessionID_label']);

    function eraseCookie() {
        console.log('hello');
        axios.post('https://inkyuoh.shop/logout', {
                param: cookies.sessionID_label
        })
        .then((response) => {
            removeCookie('sessionID_label');
            navigate('/');
            console.log('logout success:', response);
        })
        .catch((error) => {
            console.log('logout fail:', error)
        })
    }

    return(
        <header className={styles.headerRead}>
            <div>
                <img className={styles.logoRead} src={process.env.PUBLIC_URL + '/images/labelLogoWhite.png'} onClick={() => { navigate('/library')}}></img>
            </div>
            <nav className={styles.navRead}>
                <button className={styles.button} onClick={() => { navigate('/') }}>Logout</button>
                <UserImg></UserImg>
            </nav>
        </header>
    )
}

function NavReading(props){
    const navigate = useNavigate();

    return(
        <header className={styles.headerRead}>
            <div>
                <img className={styles.logoRead} src={process.env.PUBLIC_URL + '/images/labelLogoWhite.png'} onClick={() => { navigate('/library')}}></img>
            </div>
            <nav className={styles.navRead}>
                {/* <label className={styles.labelRead}>Upload
                    <input style={{display:'none'}} type='file'/>
                </label> */}
                <UserImg></UserImg>
                <img className={styles.switch} style={{ cursor: 'default', height: '1.5rem'}} src={process.env.PUBLIC_URL + `/images/division1.png`}/>
                <img className={styles.switch} onClick={()=>{props.setMode(false)}} src={process.env.PUBLIC_URL + `/images/division2.png`}/>
                <img className={styles.switch} onClick={()=>{props.setMode(true)}} src={process.env.PUBLIC_URL + `/images/division3.png`}/>
            </nav>
        </header>
    )
}

function NavLogin(){
    const navigate = useNavigate();

    return(
        <header className={styles.headerRead}>
            <div>
                <img className={styles.logoRead} src={process.env.PUBLIC_URL + '/images/labelLogoWhite.png'} onClick={() => { navigate('/library')}}></img>
            </div>
        </header>
    )
}

const UserImg = ()=>{

    const [result, setResult] = useState([]);

    useEffect(()=>{
        fetch(`https://inkyuoh.shop/userInfo`)
        .then((res) => {
            return res.json();
        })
        .then((res)=>{
            setResult(res.result);
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    return(
        <UserInfo result={result} length={result.length}></UserInfo>
    )
}

const UserInfo = (props)=>{

    const navigate = useNavigate();

    return(
        <img className={styles.randomImg} src={`${props.result[0]?.userPhoto}`} onClick={() => { navigate('/userpage')}}/>
    )
}