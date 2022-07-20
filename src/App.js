import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav/Nav.js'
import Landing from './components/Landing/Landing.js'
import Signup from './components/Signup/Signup.js'
import UserPage from './components/UserPage/UserPage.js';
import Highlight from './components/Highlight/Highlight';
import Library from './components/Library/Library.js';
import Test from './components/Test/Test.js'
import PersonalReading from './components/PersonalReading/PersonalReading.js';
import { Milkdown } from './components/CoEditorMilk/CoEditorMilk';
// import EditBook from './components/EditBook/EditBook.js'
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import React, { StrictMode } from 'react';

function App() {
	
	const markdown = `
# Milkdown React Test
> [Milkdown](https://milkdown.dev/) is an editor.
![cat](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/VAN_CAT.png/440px-VAN_CAT.png)
\`\`\`javascript [Sample]
const milkdown = new Milkdown();
milkdown.create();
\`\`\`
---
Now you can play!
`;
    function Test(props){
        return <Milkdown value={markdown}/>
    }
  	return (
		<div className="App">
			<Nav></Nav>
			
			<Routes>
				<Route path="/" element={<Landing></Landing>}></Route>
				{/* <Route path="/signup" element={<Signup></Signup>}></Route> */}
				<Route path="/library/*" element={<Library></Library>}></Route>
				<Route path="/personalreading/*" element={<PersonalReading></PersonalReading>}></Route>
				<Route path='/userpage/*' element={<UserPage />}></Route>
				<Route path='/highlight/*' element={<Highlight />}></Route>
				{/* <Route path='/coeditor' element={<Y />}></Route> */}
                <Route path='/milkdown' element={
                <StrictMode>
                    <Test/>
                </StrictMode>
                }></Route>
				{/* <Route path='/editbook/*' element={<EditBook/>}></Route> */}
			</Routes>
		</div>
  	);
}

export default App;