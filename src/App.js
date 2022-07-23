import logo from "./logo.svg";
import "./App.css";
import Nav from "./components/Nav/Nav.js";
import Landing from "./components/Landing/Landing.js";
import Signup from "./components/Signup/Signup.js";
import UserPage from "./components/UserPage/UserPage.js";
import Highlight from "./components/Highlight/Highlight";
import Library from "./components/Library/Library.js";
import PersonalReading from "./components/PersonalReading/PersonalReading.js";
import { TextEditor } from "./components/TextEditor/TextEditor";
import { HighlightCollection } from "./components/TextEditor/HighlightCollection";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

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
                <Route path="/milkdown" element={
                    <div className="TextEditor__container" style={{ display: 'flex' }}>
                        <TextEditor></TextEditor>
                        <HighlightCollection></HighlightCollection>
                    </div>
                }></Route>
            </Routes>
        </div>
    );
}

export default App;