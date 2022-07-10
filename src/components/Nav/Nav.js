import './Nav.css'

function Nav() {
	return (
		<header>
			<div className="Header__logo">
				<img src={process.env.PUBLIC_URL + '/images/label_logo.png'} id="Header__logo__image"></img>
			</div>
			<nav>
				{/* <div className="Nav__search"></div> */}
				{/* <div className="Nav__menu"></div> */}
				<button className="Nav__profile">Sign Up</button>
			</nav>
		</header>
	);
}

export default Nav;