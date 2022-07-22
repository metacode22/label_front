import styles from './PersonalReading.module.css';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import HighlightList from './HighlightList.js'

function PersonalReading(props) {
    
    const location = useLocation();
    console.log('location:', location);
    let goToThisPageFirst = location.state;

    if (goToThisPageFirst === null) {
        // 임시로 해둠. AXIOS로 받아와야 함.
        goToThisPageFirst = 1;
    }

    let pdfIdx = 1;
    let [html, setHtml] = useState(null);
    let [currentPageNumber, setCurrentPageNumber] = useState(goToThisPageFirst);
    const highlightButton = useRef();
    const [cookies, setCookie, removeCookie] = useCookies(['id']);
    
    console.log(1, 'rendered');
    useEffect(() => {
        axios.get(`http://localhost:3001/pdfs/${pdfIdx}/pages/${currentPageNumber}`, {
            headers: {
                sessionidforauth: cookies.id
            }
        })
        .then((response) => {
            console.log('cookies:', response);
        })
        
        axios.get(`http://3.35.27.172:3000/pdfs/${pdfIdx}/pages/${currentPageNumber}`)
        .then((response) => {
            console.log(21, 'useEffect - axios - setHtml');
            setHtml(response.data.result.pageHtml);
            console.log(22, 'useEffect - axios - setHtml');
        })
        .catch(() => {
            alert('페이지 로딩에 실패하였습니다.');
        })
        .then(() => {
            axios.get(`http://3.35.27.172:3000/highlights/pdfs/${pdfIdx}/pages/${currentPageNumber}`)
            .then((response) => {
                console.log(4, 'useEffect2 - axios2 - highlightData GET');
                console.log('highlightData GET Success\nresponse:', response);
                
                const highlightData = response.data.result;
                for (let i = 0; i < highlightData.length; i++) {
                    doHighlight(highlightData[i]);
                    console.log(highlightData[i], i);
                }
            })
            .catch((error) => {
                console.log('highlightData GET Fail\nerror:', error);
            })
        })
        .catch(() => {
            alert('highlighting에 실패하였습니다.');
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
                    highlightButtonCurrent.style.display = 'block';
                    highlightButtonCurrent.classList.add('btnEntrance');
                }
            }, 0);
        }
        
        console.log(3, 'useEffect - axios - 이후');
        
        const selectableTextArea = document.querySelectorAll(".PersonalReading__pages__rightPage");
        
        selectableTextArea.forEach((element) => {
            element.addEventListener("mouseup", selectableTextAreaMouseUp)
        })
        
        function documentMouseDown(event) {
            const highlightButtonCurrent = highlightButton.current;
            if (highlightButtonCurrent.style.display === "block" && event.target.value != 'this is for documentMouseDown') {
                highlightButtonCurrent.style.display = "none";
                highlightButtonCurrent.classList.remove("btnEntrance");
                window.getSelection().empty();
            }
        }
        
        document.addEventListener("mousedown", documentMouseDown);
        
        return () => {
            document.removeEventListener("mousedown", documentMouseDown);
            clearTimeout(timer);
        }
    }, [currentPageNumber])

    return (
        <main className="PersonalReading">
            <article className="PersonalReading__pages">
                <span style={{ top:'10px',position: 'relative' }}>
                    <input type="number" onKeyUp={(event) => {
                        // enter 클릭 시
                        if (window.event.keyCode === 13) {
                            console.log(typeof event.target.value);
                            setCurrentPageNumber(Number(event.target.value));
                        }
                    }}></input><span>{currentPageNumber}</span>
                </span>
                
                <section className="PersonalReading__pages__rightPage">

                    {/* <iframe src="https://drive.google.com/file/d/11fpmErf61E_JEBmqgK5lvPZKgSK9j3Nt/view?usp=sharing#grid" width="100%" height="100%"></iframe> */}
                    <HtmlRendered html={html}></HtmlRendered>

                </section>

                <div>
                    <button className={styles.prevBtn} onClick={() => { setCurrentPageNumber(currentPageNumber - 1) }}>&lt;</button>
                    <button className={styles.nextBtn} onClick={() => { setCurrentPageNumber(currentPageNumber + 1) }}>&gt;</button>
                </div>
            </article>
            <button className={styles.highlightBtn} onClick={() => { 
                clickHighlight(pdfIdx, currentPageNumber, highlightButton);
            }} ref={highlightButton} value='this is for documentMouseDown'></button>
            
            <HighlightList></HighlightList>
        </main>
    )
}

function drawHighlight(range, node) {
    // node.classList.add('hello');
    // node.style.color = "white";
    // node.style.backgroundColor = "black";
    node.appendChild(range.extractContents());
    range.insertNode(node);
}

function doHighlight(highlightData) {
    // let timer = setTimeout(() => {
        // if (document.getElementsByClassName(`y${index.toString(16)}`)[0] === undefined) {
        //     doHighlight(highlightData, index);
        //     clearTimeout(timer);
        // } else {

            const yOfSelectedStartContainer = highlightData.startLine;
            const offsetOfSelectedStartContainer = highlightData.startOffset;
            const indexOfSelectedStartContainer = highlightData.startNode;
            
            const yOfSelectedEndContainer = highlightData.endLine;
            const offsetOfSelectedEndContainer = highlightData.endOffset;
            const indexOfSelectedEndContainer = highlightData.endNode;
            
            const decimalYOfSelectedStartContainer = parseInt(yOfSelectedStartContainer.slice(1), 16);
            const decimalYOfSelectedEndContainer =  parseInt(yOfSelectedEndContainer.slice(1), 16);
            
            // currentElement를 잘 잡지 못해서 에러가 난다.
            for (let i = decimalYOfSelectedStartContainer; i <= decimalYOfSelectedEndContainer; i++) {
                const currentElement = document.getElementsByClassName(`y${i.toString(16)}`)[0];
                const newRange = document.createRange();
                
                // if (currentElement != undefined) {
                //     if (typeof(currentElement.childNodes[indexOfSelectedStartContainer]) === "object" 
                //         && typeof(currentElement.childNodes[indexOfSelectedEndContainer]) === "object" 
                //         && currentElement.childNodes[indexOfSelectedEndContainer].length >= offsetOfSelectedEndContainer
                //         && currentElement.childNodes[indexOfSelectedStartContainer].length >= offsetOfSelectedStartContainer) {
                        
                        const newNode = document.createElement("span");
                        newNode.classList.add('highlighted');
                        if (decimalYOfSelectedStartContainer === decimalYOfSelectedEndContainer) {
                            newRange.setStart(currentElement.childNodes[indexOfSelectedStartContainer], offsetOfSelectedStartContainer);
                            newRange.setEnd(currentElement.childNodes[indexOfSelectedEndContainer], offsetOfSelectedEndContainer);
                            
                            drawHighlight(newRange, newNode);
                            return;
                        }
                        
                        if (i === decimalYOfSelectedStartContainer) {
                            console.log(currentElement);
                            console.log(currentElement.childNodes)
                            console.log(indexOfSelectedStartContainer);
                            newRange.setStart(currentElement.childNodes[indexOfSelectedStartContainer], offsetOfSelectedStartContainer);
                            newRange.setEnd(currentElement.childNodes[currentElement.childNodes.length - 1], currentElement.childNodes[currentElement.childNodes.length - 1].length);
                            
                        } else if (i === decimalYOfSelectedEndContainer) {
                            newRange.setStart(currentElement.childNodes[0], 0);
                            newRange.setEnd(currentElement.childNodes[indexOfSelectedEndContainer], offsetOfSelectedEndContainer);
                            
                        } else {
                            newRange.setStart(currentElement.childNodes[0], 0);
                            newRange.setEnd(currentElement.childNodes[currentElement.childNodes.length - 1], currentElement.childNodes[currentElement.childNodes.length - 1].length);
                            
                        }
                        
                        drawHighlight(newRange, newNode);
                    // }
                // }
            }
            
            // clearTimeout(timer);
        // }
    // }, 100);
}

function clickHighlight(pdfIdx, currentPageNumber, highlightButton) {
    const selectedText = window.getSelection().toString().trim();
    const selectedRange = window.getSelection().getRangeAt(0);

    // 같은 Text를 거꾸로 drag해도 selectedStartContainer와 selectedEndContainer는 동일하다.
    const selectedStartContainer = window.getSelection().getRangeAt(0).startContainer;
    const selectedEndContainer = window.getSelection().getRangeAt(0).endContainer;
    const parentElementOfSelectedStartContainer = selectedStartContainer.parentElement;
    const parentElementOfSelectedEndContainer = selectedEndContainer.parentElement;
    
    const offsetOfSelectedStartContainer = selectedRange.startOffset;
    let indexOfSelectedStartContainer = 0;
    for (let i = 0; i < selectedStartContainer.parentElement.childNodes.length; i++) {
        if (selectedStartContainer.parentElement.childNodes[i] === selectedStartContainer) {
            indexOfSelectedStartContainer = i;
        }
    }
    
    // end는 마지막을 초과해서 포함하는 것 같다.
    const offsetOfSelectedEndContainer = selectedRange.endOffset;
    let indexOfSelectedEndContainer = 0;
    
    for (let i = 0; i < selectedEndContainer.parentElement.childNodes.length; i++) {
        if (selectedEndContainer.parentElement.childNodes[i] === selectedEndContainer) {
            indexOfSelectedEndContainer = i;
        }
    }
    
    function recur(x, count) {
        if (x.classList.toString().includes('y') === true) {

            return x.classList;
        }
        
        return recur(x.parentElement, count + 1);
    }
    
    let yOfSelectedStartContainer = recur(parentElementOfSelectedStartContainer, 0)[4];
    let yOfSelectedEndContainer = recur(parentElementOfSelectedEndContainer, 0)[4];
    
    const highlightData = {
        pdfIdx: pdfIdx,
        pageNum: currentPageNumber,
        startLine: yOfSelectedStartContainer,
        startOffset: offsetOfSelectedStartContainer,
        startNode: indexOfSelectedStartContainer,
        endLine: yOfSelectedEndContainer,
        endOffset: offsetOfSelectedEndContainer,
        endNode: indexOfSelectedEndContainer,
        data: selectedText
    }
    
    doHighlight(highlightData);

    axios.post('http://3.35.27.172:3000/highlights', {
        "pdfIdx": pdfIdx,
        "pageNum": currentPageNumber,
        "startLine": yOfSelectedStartContainer,
        "startOffset": offsetOfSelectedStartContainer,
        "startNode": indexOfSelectedStartContainer,
        "endLine": yOfSelectedEndContainer,
        "endOffset": offsetOfSelectedEndContainer,
        "endNode": indexOfSelectedEndContainer,
        "data": selectedText
    })
    .then((response) => {
        console.log('Highlight POST Success\nresponse:', response);
    })
    .catch((error) => {
        console.log('Highlight POST Fail\nerror:', error);
    })
    
    highlightButton.current.style.display = "none";
}

function HtmlRendered(props) {
    return (
        <div dangerouslySetInnerHTML={{__html: props.html}}></div>
    )
}

export default PersonalReading;