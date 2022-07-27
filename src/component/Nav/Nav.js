import styles from './Nav.module.css'
import { useNavigate, useLocation } from 'react-router-dom';

export default function Nav(props){
    const location = useLocation();
    const site = location.pathname;
    // console.log(site);

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

    return(
        <header className={styles.headerRead}>
            <div>
                <img className={styles.logoRead} src={process.env.PUBLIC_URL + '/images/labelLogoWhite.png'} onClick={() => { navigate('/library')}}></img>
            </div>
            <nav className={styles.navRead}>
                <button className={styles.button} onClick={() => { navigate('/') }}>Logout</button>
                <img className={styles.randomImg} src={process.env.PUBLIC_URL + `/images/o.png`} onClick={() => { navigate('/userpage')}}/>
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
                <label className={styles.labelRead}>Upload
                    <input style={{display:'none'}} type='file'/>
                </label>
                <img className={styles.randomImg} src={process.env.PUBLIC_URL + `/images/o.png`} onClick={() => { navigate('/userpage')}}/>
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