import './Nav.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

// function Textstart(props){
// 	const [Text, setText] = useState('Sign Up');

// 	const TextEnd = ()=>{
// 		setText(prev => prev === "Log In" ? "Sign Up" : "Log In")
// 	}
// 	return (
// 		<button className="Nav__profile" onClick={TextEnd}>{Text}</button>
// 	)
// }

// function Navigate(){
// 	const navigate = useNavigate();
// 	return (
// 		<Textstart onClick={()=> navigate('/signup')}></Textstart>
// 	)
// }

function Nav() {
    let navigate = useNavigate();

	const [Visible, setVisible] = useState('signup');

	return (
		<header>
			<div className="Header__logo">
				<img src={process.env.PUBLIC_URL + '/images/label_logo.png'} id="Header__logo__image"  onClick={() => { navigate('/library') }}></img>
			</div>
			<nav>
				{/* <div className="Nav__search"></div> */}
				{/* <div className="Nav__menu"></div> */}
				<button className="Nav__profile" onClick={() => {setVisible(!Visible); navigate('/signup') }}>{Visible ? 'Log In' : 'Sign Up'}</button>
				{/* <Navigate></Navigate> */}
			</nav>
		</header>
	);
}

function Signup() {
    
    return (
        <main className="Landing__main">
            <article className="Landing__article">
            </article>
            <aside className='Landing__aside'>
                <div className="Landing__login">
                    <h1 className="Landing__login--loginText">Sign Up</h1>
                    <div className="Landing__login--socialLogin">
                        <img src={process.env.PUBLIC_URL + '/images/google_login_icon.png'} id='Google__login__icon'></img>
                        <div>&nbsp;&nbsp;Sign up with Google</div>
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

export default Nav;