import "./App.css";
import Nav from './component/Nav/Nav'
import Login from "./component/Login/Login";
import Signup from "./component/SignUp/SignUp.js";
// import Userpage from "./component/User/User";
// import Library from "./component/Library/Library"
// import PersonalReading from "./components/PersonalReading/PersonalReading.js";
import Footer from './component/Footer/Footer'
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { lazy, Suspense, useState } from 'react';
import Practice from './components/Practice/Practice.js';

const Userpage = lazy(() => import ('./component/User/User.js'));
const Library = lazy(() => import ('./component/Library/Library.js'));
const PersonalReading = lazy(() => import ('./components/PersonalReading/PersonalReading.js'));

export default function App() {
    const location = useLocation();
    const site = location.pathname;

    return (
        <>
        {site === '/personalreading' ? <AppColor></AppColor> : <AppNonColor></AppNonColor>}
        </>
    );
}

function AppColor(props){
    const [mode, setMode] = useState(true);

    return(
        <div className="AppColor">
            <Nav mode={mode} setMode={setMode}></Nav>
            
            <Suspense fallback={<div>로딩 중</div>}>
                <Routes>
                    <Route path="/" element={<Login></Login>}></Route>
                    <Route path="/practice" element={<Practice></Practice>}></Route>    
                    <Route path="/signup" element={<Signup></Signup>}></Route>
                    <Route path="/library/*" element={<Library></Library>}></Route>
                    <Route path="/personalreading/*" element={<PersonalReading mode={mode} setMode={setMode}></PersonalReading>}></Route>
                    <Route path="/userpage/*" element={<Userpage />}></Route>
                </Routes>
            </Suspense>
                
            <Footer></Footer>
        </div>
    )
}

function AppNonColor(props){
    const [mode, setMode] = useState(true);

    return(
        <div className="App">
            <Nav mode={mode} setMode={setMode}></Nav>
            
            <Suspense fallback={<div>로딩 중</div>}>
                <Routes>
                    <Route path="/" element={<Login></Login>}></Route>
                    <Route path="/practice" element={<Practice></Practice>}></Route>
                    <Route path="/signup" element={<Signup></Signup>}></Route>
                    <Route path="/library/*" element={<Library></Library>}></Route>
                    <Route path="/personalreading/*" element={<PersonalReading mode={mode} setMode={setMode}></PersonalReading>}></Route>
                    <Route path="/userpage/*" element={<Userpage />}></Route>
                </Routes>
            </Suspense>
            
            <Footer></Footer>
        </div>
    )
}