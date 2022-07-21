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
// import EditBook from './components/EditBook/EditBook.js'
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    let [count, setCount] = useState(0);
    
    let [flagForTextEditor, setFlagForTextEditor] = useState(0);
    let [flagForHighlightCollection, setFlagForHighlightCollection] = useState(0);
    let [markdownForTextEditor, setMarkdownForTextEditor] = useState('');
    let [markdownForHighlightCollection, setMarkdownForHighlightCollection] = useState('');
    let pdfIdx = 1;
    let pageNumberForTextEditor = 7;
    let pageNumberForHighlightCollection = 8;
    
    useEffect(() => {
        axios.get(`http://3.35.27.172:3000/highlights/pdfs/${pdfIdx}/pages/${pageNumberForTextEditor}`)
            .then((response) => {
                let markdown = '';
                markdown += '- 전체 선택\n';
                // markdown += '\n';
                for (let i = 0; i < response.data.result.length; i++) {
                    markdown += '- ' + response.data.result[i].data;
                    markdown += `\n`;
                }
                
                setMarkdownForTextEditor(markdown);
                setFlagForTextEditor(flagForTextEditor + 1);
        })
        
        axios.get(`http://3.35.27.172:3000/highlights/pdfs/${pdfIdx}/pages/${pageNumberForHighlightCollection}`)
            .then((response) => {
                let markdown = '';
                markdown += '- 전체 선택\n';
                // markdown += '\n';
                for (let i = 0; i < response.data.result.length; i++) {
                    markdown += '- ' + response.data.result[i].data;
                    markdown += '\n';
                }
                
                console.log('axios2');
                // setMarkdownForTextEditor(prevMarkdown);
                // setFlagForTextEditor(true);
                setMarkdownForHighlightCollection(markdown);
                setFlagForHighlightCollection(flagForHighlightCollection + 1);
            })
    }, [count])
    
    return (
        <div className="App">
            <Nav></Nav>

            <Routes>
                <Route path="/" element={<Landing></Landing>}></Route>
                <Route path="/library/*" element={<Library></Library>}></Route>
                <Route path="/personalreading/*" element={<PersonalReading count={count} setCount={setCount}></PersonalReading>}></Route>
                <Route path="/userpage/*" element={<UserPage />}></Route>
                <Route path="/highlight/*" element={<Highlight />}></Route>
                <Route path="/milkdown" element={
                    // flagForTextEditor ?
                    // <div style={{ display: "flex"}}>
                    //     <TextEditor value={markdownForTextEditor}></TextEditor>
                    //     {flagForHighlightCollection ? 
                    //         <HighlightCollection value={markdownForHighlightCollection}></HighlightCollection> 
                    //         : null}
                    // </div>
                    // : null
                    <div style={{display: 'flex'}}>
                        {flagForTextEditor && <TextEditor value={markdownForTextEditor}></TextEditor>}
                        {flagForHighlightCollection && <HighlightCollection value={markdownForHighlightCollection}></HighlightCollection>}
                    </div>
                    }>
                </Route>
            </Routes>
        </div>
    );
}

export default App;

// # Milkdown React Test
// > [Milkdown](https://milkdown.dev/) is an editor.
// ![cat](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/VAN_CAT.png/440px-VAN_CAT.png)
// \`\`\`javascript [Sample]
// const milkdown = new Milkdown();
// milkdown.create();
// \`\`\`
// ---
// Now you can play!