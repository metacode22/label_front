import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav/Nav.js'
import Landing from './components/Landing/Landing.js'
import UserPage from './components/UserPage/UserPage.js';
import Highlight from './components/Highlight/Highlight';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  	return (
		<div className="App">
			<Nav></Nav>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Landing />}></Route>
					<Route path='/userpage/*' element={<UserPage />}></Route>
					<Route path='/highlight/*' element={<Highlight />}></Route>
					{/* <Route path="*" element={<NotFound />}></Route> */}
				</Routes>
			</BrowserRouter>
			{/* <Landing></Landing> */}
			{/* <UserPage></UserPage> */}
		</div>
  	);
}

export default App;
