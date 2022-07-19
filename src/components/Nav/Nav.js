import './Nav.css';
import { useNavigate } from 'react-router-dom';
import Logout from '../Logout/Logout'

function Nav() {
	let navigate = useNavigate();
	
	return (
		<header>
			<div className="Header__logo">
				<img src={process.env.PUBLIC_URL + '/images/label_logo.png'} id="Header__logo__image" onClick={() => { navigate('/library')}}></img>
			</div>
			<nav>
				{/* <div className="Nav__search"></div> */}
				{/* <div className="Nav__menu"></div> */}
				{window.location.href.charAt(window.location.href.length - 1) != "/" ? 
				<div>
					<button className="Nav__profile" onClick={() => { navigate('/highlight') }}>My Labels</button>
					<button className="Nav__profile" onClick={() => { navigate('/library') }}>My Library</button>
					<Logout></Logout>
				</div> : 
				<></>}
				{/* <button className="Nav__profile">Sign Up</button> */}
			</nav>
		</header>
	);
}

function NavLogIn() {
	return (
		<header>
			<div className="Header__logo">
				<img src={process.env.PUBLIC_URL + '/images/label_logo.png'} id="Header__logo__image"  onClick={() => { navigate('/library') }}></img>
			</div>
			<nav>
				<button className="Nav__profile">My Labels</button>
				<button className="Nav__profile">My Library</button>
				<button className="Nav__profile">Log In</button>
			</nav>
		</header>	
	);
}

export default Nav;