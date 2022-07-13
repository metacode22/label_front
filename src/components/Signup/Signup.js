import '../Landing/Landing.css'
import { useNavigate } from 'react-router-dom';

function Signup() {
    let navigate = useNavigate();
    
    return (
        <main className="Landing__main">
            <article className="Landing__article">
            </article>
            <aside className='Landing__aside'>
                <div className="Landing__login">
                    <h1 className="Landing__login--loginText">Sign Up</h1>
                    <div className="Landing__login--socialLogin">
                        <img src={process.env.PUBLIC_URL + '/images/google_login_icon.png'} id='Google__login__icon'></img>
                        <div>&nbsp;&nbsp;sign up with Google</div>
                    </div>
                    <div className="Landing__login--or">or</div>
                    <form action="" method="" className="Landing__login__form">
                        <label>
                            <input type="email" placeholder="  Email" className="Landing__login--input"></input>
                        </label>
                        <label>
                            <input type="password" placeholder="  Password" className="Landing__login--input"></input>
                        </label>
                        <button type="submit" className="Landing__login--button" onClick={() => { navigate('/') }}>Sign Up</button>
                    </form>
                    <p style={{textAlign: 'center', fontSize: '12px'}}>By continuing, you agree to Label's Terms of Service and Privacy Policy. </p>
                </div>
            </aside>
        </main>
    );
}

export default Signup;