import "./App.css";
import Nav from './component/Nav/Nav'
import Landing from "./components/Landing/Landing.js";
import Signup from "./components/Signup/Signup.js";
import UserPage from "./components/UserPage/UserPage.js";
import Highlight from "./components/Highlight/Highlight";
import Library from "./component/Library/Library"
import PersonalReading from "./components/PersonalReading/PersonalReading.js";
import Footer from './component/Footer/Footer'
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Nav></Nav>

            <Routes>
                <Route path="/" element={<Landing></Landing>}></Route>
                <Route path="/library/*" element={<Library></Library>}></Route>
                <Route path="/personalreading/*" element={<PersonalReading></PersonalReading>}></Route>
                <Route path="/userpage/*" element={<UserPage />}></Route>
                <Route path="/highlight/*" element={<Highlight />}></Route>
            </Routes>
            
            <Footer></Footer>
        </div>
    );
}

export default App;