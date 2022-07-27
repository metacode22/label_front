import "./App.css";
import Nav from './component/Nav/Nav'
import Login from "./component/Login/Login";
import Signup from "./component/SignUp/SignUp.js";
import UserPage from "./component/UserPage/UserPage.js";
import Library from "./component/Library/Library"
import PersonalReading from "./components/PersonalReading/PersonalReading.js";
import Footer from './component/Footer/Footer'
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from 'react';

export default function App() {
    const location = useLocation();
    const site = location.pathname;

    return (
        <>
        {site === '/personalreading' ? <AppColor></AppColor> : <AppNonColor></AppNonColor>}
        </>
    );
}

function AppColor(){
    const [mode, setMode] = useState(true);

    return(
        <div className="AppColor">
            <Nav mode={mode} setMode={setMode}></Nav>

            <Routes>
                <Route path="/" element={<Login></Login>}></Route>
                <Route path="/signup" element={<Signup></Signup>}></Route>
                <Route path="/library/*" element={<Library></Library>}></Route>
                <Route path="/personalreading/*" element={<PersonalReading mode={mode} setMode={setMode}></PersonalReading>}></Route>
                <Route path="/userpage/*" element={<UserPage />}></Route>
            </Routes>
            
            <Footer></Footer>
        </div>
    )
}

function AppNonColor(){
    const [mode, setMode] = useState(true);

    return(
        <div className="App">
            <Nav mode={mode} setMode={setMode}></Nav>

            <Routes>
                <Route path="/" element={<Login></Login>}></Route>
                <Route path="/signup" element={<Signup></Signup>}></Route>
                <Route path="/library/*" element={<Library></Library>}></Route>
                <Route path="/personalreading/*" element={<PersonalReading mode={mode} setMode={setMode}></PersonalReading>}></Route>
                <Route path="/userpage/*" element={<UserPage />}></Route>
            </Routes>
            
            <Footer></Footer>
        </div>
    )
}