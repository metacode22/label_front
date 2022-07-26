import styles from './Login.module.css'
import { useNavigate } from 'react-router'

export default function Login(){
    const navigate = useNavigate()

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
                        <input className={styles.input} type='email'/>
                    </label>
                    <label>
                        <p className={styles.p}>Password</p>
                        <input className={styles.input} type='password'/>
                    </label>
                    {/* <label>
                        <p className={styles.p}>Name</p>
                        <input className={styles.input} type='text'/>
                    </label> */}
                    <button className={styles.buttonLogin}>Login</button>
                    <button className={styles.buttonGoogle}>Login with Google</button>
                </form>
                <p className={styles.pBottom}>Don't have an account? <a className={styles.a} onClick={()=>{navigate('/signup')}}>Join free today!</a></p>
            </aside>
        </main>
    )
}