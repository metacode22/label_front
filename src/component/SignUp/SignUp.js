import styles from './SignUp.module.css'

export default function SignUp(){
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
                        <input className={styles.input} type='email'/>
                    </label>
                    <label>
                        <p className={styles.p}>Password</p>
                        <input className={styles.input} type='password'/>
                    </label>
                    <label>
                        <p className={styles.p}>Name</p>
                        <input className={styles.input} type='text'/>
                    </label>
                    <button className={styles.buttonLogin}>Sign up</button>
                    <button className={styles.buttonGoogle}>Sign up with Google</button>
                </form>
                <p className={styles.pBottom}>By continuing you agree to Label's Terms of Service and Privacy Policy.</p>
            </aside>
        </main>
    )
}