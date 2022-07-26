import styles from './Nav.module.css'
import { useNavigate, useLocation } from 'react-router-dom';

export default function Nav(){
    const location = useLocation();
    const site = location.pathname;
    // console.log(site);

    return(
        <>
            {site === '/' && <NavLogin></NavLogin>}
            {site === '/signup' && <NavLogin></NavLogin>}
            {site === '/library' && <NavDefault></NavDefault>}
            {site === '/userpage' && <NavDefault></NavDefault>}
            {site === '/personalreading' && <NavReading></NavReading>}
        </>
    )
}

function NavDefault(){
    const navigate = useNavigate();

    return(
        <header className={styles.headerRead}>
            <div>
                <img className={styles.logoRead} src={process.env.PUBLIC_URL + '/images/labelLogoWhite.png'} onClick={() => { navigate('/library')}}></img>
            </div>
            <nav className={styles.navRead}>
                <label className={styles.label}>Upload
                    <input style={{display:'none'}} type='file'/>
                </label>
                <button className={styles.button} onClick={() => { navigate('/') }}>Logout</button>
                <img className={styles.randomImg} src={process.env.PUBLIC_URL + `/images/example.ico`} onClick={() => { navigate('/userpage')}}/>
            </nav>
        </header>
    )
}

function NavReading(){
    const navigate = useNavigate();

    return(
        <header className={styles.headerRead}>
            <div>
                <img className={styles.logoRead} src={process.env.PUBLIC_URL + '/images/labelLogoWhite.png'} onClick={() => { navigate('/library')}}></img>
            </div>
            <nav className={styles.navRead}>
                <img className={styles.randomImg} src={process.env.PUBLIC_URL + `/images/example.ico`} onClick={() => { navigate('/userpage')}}/>
                <label className={styles.labelRead}>Upload
                    <input style={{display:'none'}} type='file'/>
                </label>
                <img className={styles.switch} src={process.env.PUBLIC_URL + `/images/square.png`}/>
                <img className={styles.switch} src={process.env.PUBLIC_URL + `/images/square.png`}/>
                <img className={styles.switch} src={process.env.PUBLIC_URL + `/images/square.png`}/>
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