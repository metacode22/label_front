import "./PersonalReading.css";
import axios from 'axios';
import { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// sideComponents
import { TextEditor } from "./sideComponents/TextEditor/TextEditor.tsx";
import PageRendered from "./sideComponents/PageRendered/PageRendered.js";
import HighlightList from "./sideComponents/HighlightList/HighlightList.js";

// sideFunction for highlighting

function PersonalReading(props) {
    let [mode, setMode] = useState(true);
    let [html, setHtml] = useState('');
    let [updateHighlightList, setUpdateHighlightList] = useState(true);
    
    // 수정 필요, props로 받아야 할 듯.
    // library에서 넘어올 때 currentPageNumber를 유저로부터 가져와야 함.
    // redux?
    let [currentPageNumber, setCurrentPageNumber] = useState(7);
    
    // library에서 넘어올 때 받아와야 할 듯.
    // useLocation
    let pdfIdx = 74;
    
    // highlight Button
    const highlightButton = useRef();
    
    useEffect(() => {
        axios.get(`http://43.200.26.215:3000/pdfs/${pdfIdx}/pages/${currentPageNumber}`)
            .then((response) => {
                console.log('pageLink GET response:', response);      
                
                return response.data.result.pageLink;
            })
            .catch((error) => {
                console.log('pageLink GET Fail, error:', error);
            })
            .then((pageLink) => {
                axios.get(`${pageLink}`)
                    .then((response) => {
                        console.log('html GET response:', response);
                        setHtml(response.data);
                    })
            })
            .catch((error) => {
                console.log('html GET Fail, error:', error);
            })
            .then(() => {
                axios.get(`http://43.200.26.215:3000/highlights/pdfs/${pdfIdx}/pages/${currentPageNumber}`)
                    .then((response) => {
                        console.log('highlight data GET response:', response);
    
                        for(let i = 0; i < response.data.result?.length; i++) {
                            if (response.data.result[i].active === 1) {
                                doHighlight(response.data.result[i], response.data.result[i].highlightIdx);    
                            }
                        }
                    })
                    // .catch((error) => {
                    //     console.log('highlight data GET Fail, error:', error);
                    // })
            })
            
        
        /* ------------------------------------------------------------ */    
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

        selectableTextArea?.forEach((element) => {
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
            selectableTextArea?.forEach((element) => {
                element?.removeEventListener("mouseup", selectableTextAreaMouseUp);
            });
            clearTimeout(timer);
        };
        
    }, [currentPageNumber, mode])

    /* ------------------------------------------------------------ */
    
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
                
                <div className="PersonalReading__mainPage" style={mode === true ? {flex: 2} : {flex: 1}}>
                    {mode === true ? <article className="PersonalReading__mainPage--readingPage">
                        <PageRendered className="PageRendered" html={html}></PageRendered>
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
                
                <aside className="PersonalReading__highlightList" style={mode === true ? {flex: 0.6} : {flex: 1}}>
                    <HighlightList currentPageNumber={currentPageNumber} updateHighlightList={updateHighlightList} setUpdateHighlightList={setUpdateHighlightList}></HighlightList>
                </aside>
            </div>
        </main>
    );
}











// Highlighting Logic
function drawHighlight(range, node) {
    node.appendChild(range.extractContents());
    range.insertNode(node);
}

function doHighlight(highlightData, highlightIdx) {
    const yOfSelectedStartContainer = highlightData.startLine;
    const offsetOfSelectedStartContainer = highlightData.startOffset;
    const indexOfSelectedStartContainer = highlightData.startNode;

    const yOfSelectedEndContainer = highlightData.endLine;
    const offsetOfSelectedEndContainer = highlightData.endOffset;
    const indexOfSelectedEndContainer = highlightData.endNode;

    const decimalYOfSelectedStartContainer = parseInt( yOfSelectedStartContainer.slice(1), 16);
    const decimalYOfSelectedEndContainer = parseInt( yOfSelectedEndContainer.slice(1), 16);

    // currentElement를 잘 잡지 못해서 에러가 난다.
    for ( let i = decimalYOfSelectedStartContainer; i <= decimalYOfSelectedEndContainer; i++) {
        const currentElement = document.getElementsByClassName( `y${i.toString(16)}`)[0];
        const newRange = document.createRange();

        const newNode = document.createElement("span");
        
        // delete 시 곧바로 삭제할 수 있도록 미리 class를 더해놓음.
        // 나중에 지울 때 class를 통해 곧바로 노드를 찾아서 highlighted 클래스를 제거하면 됨.
        newNode.classList.add("highlighted");
        newNode.classList.add('highlight' + highlightIdx);
        if ( decimalYOfSelectedStartContainer === decimalYOfSelectedEndContainer) {
            newRange.setStart( currentElement.childNodes[indexOfSelectedStartContainer], offsetOfSelectedStartContainer);
            newRange.setEnd( currentElement.childNodes[indexOfSelectedEndContainer], offsetOfSelectedEndContainer);

            drawHighlight(newRange, newNode);
            return;
        }

        if (i === decimalYOfSelectedStartContainer) {
            newRange.setStart( currentElement.childNodes[indexOfSelectedStartContainer], offsetOfSelectedStartContainer);
            newRange.setEnd( currentElement.childNodes[currentElement.childNodes.length - 1], currentElement.childNodes[currentElement.childNodes.length - 1].length);
        } else if (i === decimalYOfSelectedEndContainer) {
            newRange.setStart(currentElement.childNodes[0], 0);
            newRange.setEnd( currentElement.childNodes[indexOfSelectedEndContainer], offsetOfSelectedEndContainer);
        } else {
            newRange.setStart(currentElement.childNodes[0], 0);
            newRange.setEnd( currentElement.childNodes[currentElement.childNodes.length - 1], currentElement.childNodes[currentElement.childNodes.length - 1].length);
        }

        drawHighlight(newRange, newNode);
    }
}

function clickHighlight( pdfIdx, currentPageNumber, highlightButton, updateHighlightList, setUpdateHighlightList ) {
    const selectedText = window.getSelection().toString().trim();
    const selectedRange = window.getSelection().getRangeAt(0);

    // 같은 Text를 거꾸로 drag해도 selectedStartContainer와 selectedEndContainer는 동일하다.
    const selectedStartContainer = window.getSelection().getRangeAt(0).startContainer;
    const selectedEndContainer = window.getSelection().getRangeAt(0).endContainer;
    const parentElementOfSelectedStartContainer = selectedStartContainer.parentElement;
    const parentElementOfSelectedEndContainer = selectedEndContainer.parentElement;

    const offsetOfSelectedStartContainer = selectedRange.startOffset;
    let indexOfSelectedStartContainer = 0;
    for ( let i = 0; i < selectedStartContainer.parentElement.childNodes.length; i++ ) {
        if ( selectedStartContainer.parentElement.childNodes[i] === selectedStartContainer ) {
            indexOfSelectedStartContainer = i;
        }
    }

    // end는 마지막을 초과해서 포함하는 것 같다.
    const offsetOfSelectedEndContainer = selectedRange.endOffset;
    let indexOfSelectedEndContainer = 0;

    for ( let i = 0; i < selectedEndContainer.parentElement.childNodes.length; i++) {
        if ( selectedEndContainer.parentElement.childNodes[i] === selectedEndContainer ) {
            indexOfSelectedEndContainer = i;
        }
    }
    function recur(x, count) {
        if (x.classList.toString().includes("y") === true) {
            return x.classList;
        }

        return recur(x.parentElement, count + 1);
    }

    let yOfSelectedStartContainer = recur( parentElementOfSelectedStartContainer, 0 )[4];
    let yOfSelectedEndContainer = recur( parentElementOfSelectedEndContainer, 0 )[4];

    const highlightData = {
        pdfIdx: pdfIdx,
        pageNum: currentPageNumber,
        startLine: yOfSelectedStartContainer,
        startOffset: offsetOfSelectedStartContainer,
        startNode: indexOfSelectedStartContainer,
        endLine: yOfSelectedEndContainer,
        endOffset: offsetOfSelectedEndContainer,
        endNode: indexOfSelectedEndContainer,
        data: selectedText,
    };

    axios.post("http://43.200.26.215:3000/highlights", {
            pdfIdx: pdfIdx,
            pageNum: currentPageNumber,
            startLine: yOfSelectedStartContainer,
            startOffset: offsetOfSelectedStartContainer,
            startNode: indexOfSelectedStartContainer,
            endLine: yOfSelectedEndContainer,
            endOffset: offsetOfSelectedEndContainer,
            endNode: indexOfSelectedEndContainer,
            data: selectedText,
        })
        .then((response) => {
            console.log("Highlight POST Success\nresponse:", response);
            setUpdateHighlightList(!updateHighlightList);
        })
        .catch((error) => {
            console.log("Highlight POST Fail\nerror:", error);
        })
        .then(() => {
            axios.get(`http://43.200.26.215:3000/highlights/pdfs/${pdfIdx}/pages/${currentPageNumber}`)
                .then((response) => {
                    doHighlight(highlightData, response.data.result[response.data.result.length - 1].highlightIdx);
                })
        })

    highlightButton.current.style.display = "none";
}

export default PersonalReading;
