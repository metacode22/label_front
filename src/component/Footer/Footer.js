import styles from './Footer.module.css'
import { useLocation } from 'react-router-dom';

export default function Footer(){
    const location = useLocation();
    const site = location.pathname;

    return(
        <>
        {site !== '/personalreading' ? (<OnFooter></OnFooter>) : null}
        </>
    )
}

function OnFooter(){
    return(
        <footer className={styles.footer}>
            <div>ⓒ Label. All rights reserved.</div>
        </footer>
    )
}