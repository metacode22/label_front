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

	const [Visible, setVisible] = useState(false);

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

export default Nav;