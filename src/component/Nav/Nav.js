import styles from './Nav.module.css'
import { useNavigate } from 'react-router-dom';
import { style } from '@mui/system';

export default function Nav(){
    const navigate = useNavigate();

    return(
        <header className={styles.header}>
            <div>
                <img className={styles.logo} src={process.env.PUBLIC_URL + '/images/labelLogo.png'} onClick={() => { navigate('/library')}}></img>
            </div>
            <label className={styles.search}>
                <img className={styles.searchImg} src={process.env.PUBLIC_URL + '/images/search.png'}></img>
                <input type='text' className={styles.searchInput} placeholder='검색어를 입력해주세요.'></input>
            </label>
            <nav className={styles.nav}>
                <button className={styles.button} onClick={() => { navigate('/library') }}>My Library</button>
                <button className={styles.button} onClick={() => { navigate('/userpage') }}>My Page</button>
            </nav>
        </header>
    )
}