import "./App.css";
import Nav from './component/Nav/Nav'
import Login from "./component/Login/Login";
import Signup from "./component/SignUp/SignUp.js";
import UserPage from "./components/UserPage/UserPage.js";
import Library from "./component/Library/Library"
import PersonalReading from "./components/PersonalReading/PersonalReading.js";
import Footer from './component/Footer/Footer'
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Nav></Nav>

            <Routes>
                <Route path="/" element={<Login></Login>}></Route>
                <Route path="/signup" element={<Signup></Signup>}></Route>
                <Route path="/library/*" element={<Library></Library>}></Route>
                <Route path="/personalreading/*" element={<PersonalReading></PersonalReading>}></Route>
                <Route path="/userpage/*" element={<UserPage />}></Route>
                {/* <Route path="/highlight/*" element={<Highlight />}></Route> */}
            </Routes>
            
            <Footer></Footer>
        </div>
    );
}

export default App;