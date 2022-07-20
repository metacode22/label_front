import logo from "./logo.svg";
import "./App.css";
import Nav from "./components/Nav/Nav.js";
import Landing from "./components/Landing/Landing.js";
import Signup from "./components/Signup/Signup.js";
import UserPage from "./components/UserPage/UserPage.js";
import Highlight from "./components/Highlight/Highlight";
import Library from "./components/Library/Library.js";
import PersonalReading from "./components/PersonalReading/PersonalReading.js";
import { Milkdown } from "./components/CoEditorMilk/CoEditorMilk";
// import EditBook from './components/EditBook/EditBook.js'
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    let [flag, setFlag] = useState(false);
    let [markdown, setMarkdown] = useState(`
# Milkdown React Test
> [Milkdown](https://milkdown.dev/) is an editor.
![cat](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/VAN_CAT.png/440px-VAN_CAT.png)
\`\`\`javascript [Sample]
const milkdown = new Milkdown();
milkdown.create();
\`\`\`
---
Now you can play!
`);
    let pdfIdx = 1;
    let currentPageNumber = 6;
    axios.get(`http://3.35.27.172:3000/highlights/pdfs/${pdfIdx}/pages/${currentPageNumber}`)
    .then((response) => {
        setMarkdown(response.data.result[1].data + response.data.result[0].data);
        setFlag(true);
    })
    console.log(markdown);
    return (
        <div className="App">
            <Nav></Nav>

            <Routes>
                <Route path="/" element={<Landing></Landing>}></Route>
                {/* <Route path="/signup" element={<Signup></Signup>}></Route> */}
                <Route path="/library/*" element={<Library></Library>}></Route>
                <Route
                    path="/personalreading/*"
                    element={<PersonalReading></PersonalReading>}
                ></Route>
                <Route path="/userpage/*" element={<UserPage />}></Route>
                <Route path="/highlight/*" element={<Highlight />}></Route>
                {/* <Route path='/coeditor' element={<Y />}></Route> */}
                <Route
                    path="/milkdown"
                    element={flag ? <Milkdown value={markdown}></Milkdown> : null}
                ></Route>
                {/* <Route path='/editbook/*' element={<EditBook/>}></Route> */}
            </Routes>
        </div>
    );
}

export default App;
