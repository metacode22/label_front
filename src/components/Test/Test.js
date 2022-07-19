import './Test.css'
import HTMLRenderer from 'react-html-renderer'
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';

import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import { faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Test() {
    const [html, setHtml] = useState('');
    const [currentPageNumber, setCurrentPageNumber] = useState(2);
    
    useEffect(() => {
        axios.get(`http://3.35.27.172:3000/pdfs/1/${currentPageNumber}`)
        .then((response) => {
            setHtml(response.data.result.pageHtml);
        })
        .catch(() => {
            alert('페이지 로딩에 실패하였습니다.');
        })
    }, [currentPageNumber])
    
    /* highlight 기능 구현하기 */
    const selectableTextArea = document.querySelectorAll(".PersonalReading__pages__rightPage");
    const highlightButton = document.querySelector("#HighlightButton");
    
    // selectableTextArea 영역에서만 selectableTextAreaMouseUp을 더했으므로
    // selectableTextArea에서만 selectableTextAreaMouseUp 함수가 실행될 수 있다.
    // selectableTextArea는 querySelectorAll로, .PersonalReading__pages__rightPage 안의 모든 태그들을 담고 있다.
    // 그 각 태그들에게 다음과 같은 함수가 더해진다.
    selectableTextArea.forEach((elem) => {
        elem.addEventListener("mouseup", selectableTextAreaMouseUp);
    });
    
    function selectableTextAreaMouseUp(event) {
        setTimeout(() => {
            // user가 어떤 것을 select(drag) 했는지 탐색한다.
            // toString으로 문자열을 뽑고, trim으로 문자열 양 옆의 공백을 제거한다.
            // let selectedText = window.getSelection().toString().trim();

            // selectedText가 공백이 아니라면
            if (window.getSelection().toString().trim() != 0) {
                // MouseUp을 한 순간, page에서 마우스가 위치했던 x, y 좌표 값을 얻는다.
                const x = event.pageX;
                const y = event.pageY;
                
                // 스크롤 유무 차이인듯, 실험해보자.
                // -> client를 사용하면 user의 화면 위치를 바탕으로 주는 듯 하다.
                // -> page를 사용해야 해당 page에서 상대적인 위치를 구할 수 있을 것 같다.
                // const x = event.clientX;
                // const y = event.clientY;
                
                // getComputedStyle로 해당 요소의 style을 담은 object를 가져온 후, width 혹은 height를 취한다.
                // 이 때 'px'이라는 문자열이 붙은 문자형이기 때문에 slice로 뒤의 'px'를 없앤 후 Number로 숫자형으로 만든다.
                const highlightButtonWidth = Number(getComputedStyle(highlightButton).width.slice(0, -2));
                const highlightButtonHeight = Number(getComputedStyle(highlightButton).height.slice(0, -2));
                
                // x, y 값을 바탕으로 highlightButton의 위치를 재설정한다.
                // 버튼의 위치를 단순히 좀 더 정밀하게 조정해줬을 뿐이다. x, y에 빼지고 더해지는 값은 내가 마음대로 조절하면 된다.
                highlightButton.style.left = `${x - highlightButtonWidth * 0.25}px`;
                highlightButton.style.top = `${y - highlightButtonHeight * 1.25}px`;
                
                // highlightButton이 나타나게 만든다.
                highlightButton.style.display = 'block';
                
                // 3D로, 아예 없는 상태에서 크기가 커지면서 나타나게 만든다.
                // 근데 쓰면 더 이상할 것 같다. 고려해보자.
                highlightButton.classList.add('btnEntrance');
            }
        }, 0);
    }
    
    // highlightButton이 뜬 상태에서, highlightButton이 아닌 다른 것을 누르면 highlightButton이 사라지게 만든다.
    document.addEventListener("mousedown", documentMouseDown);

    function documentMouseDown(event) {
        const highlightButton = document.querySelector("#HighlightButton");
        if (highlightButton.style.display == "block" && event.target.id != 'HighlightButton') {
                highlightButton.style.display = "none";
                highlightButton.classList.remove("btnEntrance");
                window.getSelection().empty();
        }
    }
    
    if (highlightButton) {
        highlightButton.addEventListener('click',(event) => {
            const selectedText = window.getSelection();
            const selectedElement = selectedText.getRangeAt(0);
            // start container
            const firstElement = selectedElement.startContainer;
            console.log('firstElement:', firstElement);
            // start container를 담고있는 문장 node list 길이
            const lenOfFirstElement = firstElement.parentElement.childNodes.length;
            console.log('node length:', lenOfFirstElement);
            // start node의 index
            let indexOfFirstElement = 0;
            // start node의 index를 탐색하여 저장
            for(let i = 0; i < lenOfFirstElement; i++) {
                if (firstElement === firstElement.parentElement.childNodes[i]) {
                    indexOfFirstElement = i;
                }
            }
            console.log('indexOfFirstElement = ', indexOfFirstElement);
            // 시작 노드의 offset
            const offsetOfFirstElement = selectedElement.startOffset;
            console.log('offsetOfFirstElement =', offsetOfFirstElement);
            
            // end contatiner
            const endElement = selectedElement.endContainer;
            console.log('endElement:', endElement);
            // end container를 담고있는 문장 node list 길이
            const lenOfEndElement = endElement.parentElement.childNodes.length;
            console.log('end length:', lenOfEndElement);
            // end node의 index
            let indexOfEndElement = 0;
            // end node의 index를 탐색하여 저장
            for(let i = 0; i < lenOfEndElement; i++) {
                if (endElement === endElement.parentElement.childNodes[i]) {
                    indexOfEndElement = i;
                }
            }
            console.log('indexOfEndElement = ', indexOfEndElement);
            // end node의 offset
            const offsetOfEndElement = selectedElement.endOffset;
            console.log('offsetOfEndElement =', offsetOfEndElement);

            // 서버로부터 받아온 클래스 이름
            const fromClassName = 'y2';
            const toClassName = 'y4';
            // 서버로부터 받아온 start index, 첫 번째 문자 y 제거
            const startIndex = fromClassName.slice(1);
            const parsedStartIndex = parseInt(startIndex, 16);
            // 서버로부터 받아온 end index
            const endIndex = toClassName.slice(1);
            const parsedEndIndex = parseInt(endIndex, 16);

            for (let i = parsedStartIndex; i <= parsedEndIndex; i++) {
                let curIndex = 'y' + i.toString(16);
                const curElement = document.getElementsByClassName(curIndex);
                console.log(curElement);
                const range = document.createRange();
                if (i === parsedStartIndex) {
                    range.setStart(firstElement.parentElement.childNodes[indexOfFirstElement], offsetOfFirstElement);
                    range.setEnd(firstElement.parentElement.childNodes[lenOfFirstElement - 1], firstElement.parentElement.childNodes[lenOfFirstElement - 1].length);
                    console.log('first', range);
                    const newNode = document.createElement("span");
                    newNode.style.color = 'purple';
                    newNode.appendChild(range.extractContents());
                    range.insertNode(newNode);
                } else if (i === parsedEndIndex) {
                    range.setStart(endElement.parentElement.childNodes[0], 0);
                    range.setEnd(endElement.parentElement.childNodes[indexOfEndElement], offsetOfEndElement);
                    console.log('final', range);
                    const newNode = document.createElement("span");
                    newNode.style.color = 'purple';
                    newNode.appendChild(range.extractContents());
                    range.insertNode(newNode);
                } else {
                    const tempChildNode = curElement[0].childNodes;
                    console.log('curelem', curElement, tempChildNode[0]);
                    range.setStart(tempChildNode[0], 0);
                    range.setEnd(tempChildNode[tempChildNode.length - 1], tempChildNode[tempChildNode.length - 1].length);
                    console.log('center:',range);
                    const newNode = document.createElement("span");
                    newNode.style.color = 'purple';
                    newNode.appendChild(range.extractContents());
                    range.insertNode(newNode);
                }
            }

            // firefox에서는 range 객체를 여러 개 뽑을 수 있으나(여러 개 drag가 가능하나) chrome에서는 1개의 range 객체만 뽑을 수 있도록 지원한다.
            // const range = window.getSelection().getRangeAt(0);
            // const span = document.createElement('span');
            
            // span.classList.add('highlighted');
            // // span.classList.add('')
            // // span.style.display = 'inline-block';
            // span.appendChild(range.extractContents());
            // // span.innerHTML = `<span>${selectedText}</span>`
            // range.insertNode(span);
            
            // // axios.get('')
            // console.log('range:', range);
            // console.log('span:', span);
            // console.log(selectedText);
        })
    }
    
    return (
        <>
            <main className="PersonalReading">
                <article className="PersonalReading__pages">
                    {/* <section className="PersonalReading__pages__leftPage">
                        나는 첫 번째
                    </section> */}
                    {/* <section className="PersonalReading__pages__rightPage" ref={realPage} dangerouslySetInnerHTML={{ __html: html }}> */}
                    <section className="PersonalReading__pages__rightPage">
                        {/* <embed type="text/html" src={process.env.PUBLIC_URL + '/htmlSource/practice2.html'} width="100%" height="100%"></embed> */}
                        {/* <embed type="text/html" src={html} width="100%" height="100%"></embed> */}
                        {/* <HTMLRenderer html={html}></HTMLRenderer> */}
                        {/* {ReactHtmlParser(html)} */}
                        {/* <div dangerouslySetInnerHTML={{
                            __html: html
                        }}></div> */}
                        {/* <HtmlPage></HtmlPage> */}
                        {/* <iframe width="100%" height="100%">
                            <HTMLRenderer html={html}></HTMLRenderer>
                        </iframe> */}
                        <div style={{margin: 'auto', position: 'relative', width: '100%', height: '100%', overflow: 'hidden'}} dangerouslySetInnerHTML={{ __html: html}}></div>
                    </section>
                    <div className="PersonalReading__pages__buttons">
                        <button id="previousButton" onClick={() => {setCurrentPageNumber(currentPageNumber - 1)}}>P</button>
                        <button id="nextButton" onClick={() => {setCurrentPageNumber(currentPageNumber + 1)}}>N</button>
                        {/* <GoPreviousButton currentPageNumber={currentPageNumber} setCurrentPageNumber={setCurrentPageNumber}></GoPreviousButton> */}
                        {/* <GoNextButton></GoNextButton> */}
                        
                    </div>
                    {/* button for highlight */}
                    {/* <button id="HighlightButton"><FontAwesomeIcon icon={faTags} id="fai"></FontAwesomeIcon></button> */}
                    <button id="HighlightButton"></button>
                </article>
                <aside className="PersonalReading__mostLabeled">
                    <div className="PersonalReading__mostLabeled__chart">
                        <div className="PersonalReading__mostLabeled__chart--title">
                            <h2 className="PersonalReading__mostLabeled__chart--title--text">Most Labeled</h2>
                        </div>
                        <div className="PersonalReading__mostLabeled__chart--list">
                            <ol>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ol>
                        </div>
                    </div>
                </aside>
            </main>
        </>
    );
}

export default Test;