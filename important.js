import "./PersonalReading.css";
import axios from 'axios';
import { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// sideComponents
import { TextEditor } from "./sideComponents/TextEditor/TextEditor.tsx";
import PageRendered from "./sideComponents/PageRendered/PageRendered";

// sideFunction for highlighting
import { drawHighlight, doHighlight, clickHighlight} from "./sideFunction"

function PersonalReading(props) {
    let [mode, setMode] = useState(true);
    let [pageLink, setPageLink] = useState('');
    
    // 수정 필요, props로 받아야 할 듯.
    // library에서 넘어올 때 currentPageNumber를 유저로부터 가져와야 함.
    // redux?
    let [currentPageNumber, setCurrentPageNumber] = useState(23);
    
    // library에서 넘어올 때 받아와야 할 듯.
    // useLocation
    let pdfIdx = 1;
    
    // highlight Button
    const highlightButton = useRef();
    
    useEffect(() => {
        axios.get(`http://43.200.26.215:3000/pdfs/${pdfIdx}/pages/${currentPageNumber}`)
            .then((response) => {
                console.log('pageLink GET response:', response);
                setPageLink(response.data.result.pageLink);
            })
            .catch((error) => {
                console.log('pageLink GET Fail, error:', error);
            })
            .then(() => {
                axios.get(`http://43.200.26.215:3000/highlights/pdfs/${pdfIdx}/pages/${currentPageNumber}`)
                .then((response) => {
                    console.log('highlight data GET response:', response);
                    
                    for(let i = 0; i < response.data.result.length; i++) {
                        doHighlight(response.data.result[i]);
                    }
                })
                .catch((error) => {
                    console.log('highlight data GET Fail, error:', error);
                })
            })
            
        let timer = null;
        function selectableTextAreaMouseUp(event) {
            const highlightButtonCurrent = highlightButton.current;

            timer = setTimeout(() => {
                if (window.getSelection().toString().trim() != 0) {
                    const x = event.pageX;
                    const y = event.pageY;

                    const highlightButtonCurrentWidth = Number(getComputedStyle(highlightButtonCurrent).width.slice(0, -2));
                    const highlightButtonCurrentHeight = Number(getComputedStyle(highlightButtonCurrent).width.slice(0, -2));

                    highlightButtonCurrent.style.left = `${x - highlightButtonCurrentWidth * 0.25}px`;
                    highlightButtonCurrent.style.top = `${y - highlightButtonCurrentHeight * 1.25}px`;
                    highlightButtonCurrent.style.display = "block";
                    highlightButtonCurrent.classList.add("btnEntrance");
                }
            }, 0);
        }
        
        const selectableTextArea = document.querySelectorAll(".PersonalReading__mainPage--readingPage");
        console.log(selectableTextArea);

        selectableTextArea.forEach((element) => {
            console.log('hi');
            element?.addEventListener("mouseup", selectableTextAreaMouseUp);
        });

        function documentMouseDown(event) {
            const highlightButtonCurrent = highlightButton.current;
            if (
                highlightButtonCurrent.style.display === "block" &&
                event.target.value != "this is for documentMouseDown"
            ) {
                highlightButtonCurrent.style.display = "none";
                highlightButtonCurrent.classList.remove("btnEntrance");
                window.getSelection().empty();
            }
        }

        document.addEventListener("mousedown", documentMouseDown);

        return () => {
            document.removeEventListener("mousedown", documentMouseDown);
            clearTimeout(timer);
        };
        
    }, [currentPageNumber])

    return (
        <main className="PersonalReading">
            {/* show and hide 버튼으로 가자. */}
            <button onClick={() => {
                setMode(!mode);    
            }}>Change Mode</button>
            
            {/* highlight 버튼 */}
            <button 
                ref={highlightButton} 
                className="HighlightButton"
                value="this is for documentMouseDown"
                onClick={() => {
                    clickHighlight(pdfIdx, currentPageNumber, highlightButton, updateHighlightList, setUpdateHighlightList);
                }}
            ></button>
            
            <div className="PersonalReading__container">
                <aside className="PersonalReading__sideBar">Side Bar</aside>
                
                <div className="PersonalReading__mainPage">
                    {mode === true ? <article className="PersonalReading__mainPage--readingPage">
                        <PageRendered pageLink={pageLink}></PageRendered>
                    </article> 
                    : null}
                    <article className="PersonalReading__mainPage--textEditor">
                        <div className="PersonalReading__mainPage--textEditor--info">
                            {/* title 정보 받아와야 함. */}
                            <p style={{ fontSize: '16px' }}>title - 서버에서 받아와야 함.</p>
                            {/* subtitle 정보 받아와야 함. */}
                            <p style={{ fontSize: '16px' }}>subtitle - 서버에서 받아와야 함.</p>
                            {/* 저장 정보 받아와야 함. */}
                            <p style={{ fontSize: '12px', textDecoration: 'underline' }}>저장 시 남는 글 - 서버에서 받아와야 함.</p>
                        </div>
                        <TextEditor></TextEditor>
                    </article>
                </div>
                
                <aside className="PersonalReading__highlightList">Highlight List</aside>
            </div>
        </main>
    );
}

export default PersonalReading;
