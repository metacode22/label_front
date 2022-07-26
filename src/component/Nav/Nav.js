import styles from './Nav.module.css'
import { useNavigate, useLocation } from 'react-router-dom';

export default function Nav(){
    const location = useLocation();
    const site = location.pathname;
    // console.log(site);

    return(
        <>
            {/* {site !== '/personalreading' ? (<NavDefault></NavDefault>) : (<NavReading></NavReading>)} */}
            {site === '/' && <NavLogin></NavLogin>}
            {site === '/signup' && <NavLogin></NavLogin>}
            {site === '/library' && <NavDefault></NavDefault>}
            {site === '/userpage' && <NavDefault></NavDefault>}
            {site === '/personalreading' && <NavReading></NavReading>}
        </>
    )
}

// function NavDefault(){
//     const navigate = useNavigate();

//     return(
//         <header className={styles.header}>
//             <div>
//                 <img className={styles.logo} src={process.env.PUBLIC_URL + '/images/labelLogo.png'} onClick={() => { navigate('/library')}}></img>
//             </div>
//             <label className={styles.search}>
//                 <img className={styles.searchImg} src={process.env.PUBLIC_URL + '/images/search.png'}></img>
//                 <input type='text' className={styles.searchInput} placeholder='검색어를 입력해주세요.'></input>
//             </label>
//             <nav className={styles.nav}>
//                 <button className={styles.button} onClick={() => { navigate('/library') }}>My Library</button>
//                 <button className={styles.button} onClick={() => { navigate('/userpage') }}>My Page</button>
//                 <button className={styles.button} onClick={() => { navigate('/') }}>Logout</button>
//             </nav>
//         </header>
//     )
// }

function NavDefault(){
    const navigate = useNavigate();

    return(
        <header className={styles.headerRead}>
            <div>
                <img className={styles.logoRead} src={process.env.PUBLIC_URL + '/images/labelLogoWhite.png'} onClick={() => { navigate('/library')}}></img>
            </div>
            <nav className={styles.navRead}>
                <img className={styles.randomImg} src={process.env.PUBLIC_URL + `/images/example.ico`} onClick={() => { navigate('/userpage')}}/>
                <label className={styles.label}>Upload
                    <input style={{display:'none'}} type='file'/>
                </label>
                <img className={styles.switch} src={process.env.PUBLIC_URL + `/images/square.png`}/>
                <img className={styles.switch} src={process.env.PUBLIC_URL + `/images/square.png`}/>
                <img className={styles.switch} src={process.env.PUBLIC_URL + `/images/square.png`}/>
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
                <label className={styles.label}>Upload
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