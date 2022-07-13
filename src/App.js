import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav/Nav.js'
import Landing from './components/Landing/Landing.js'
import UserPage from './components/UserPage/UserPage.js';
import Highlight from './components/Highlight/Highlight';
import Library from './components/Library/Library.js';
import Test from './components/Test/Test.js'
import PersonalReading from './components/PersonalReading/PersonalReading.js';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

function App() {
  	return (
		<div className="App">
			<Nav></Nav>
			
			{/* <Landing></Landing>
			<Library></Library>
			<PersonalReading></PersonalReading> */}
			
			<Routes>
				<Route path="/" element={<Landing></Landing>}></Route>
				<Route path="/library" element={<Library></Library>}></Route>
				<Route path="/personalreading" element={<PersonalReading></PersonalReading>}></Route>
				<Route path='/userpage/*' element={<UserPage />}></Route>
				<Route path='/highlight/*' element={<Highlight />}></Route>
				<Route path='/Test/' element={<Test />}></Route>
			</Routes>
		</div>
  	);
}

export default App;
