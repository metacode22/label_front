import './PersonalReading.css'
import HTMLRenderer from 'react-html-renderer'
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import React, { Component } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import { faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import Highlighter from 'react-hightlight-colors'
// import SelectionHighlighter from 'react-highlight-selection';

import { HighlightableTextArea } from 'react-highlight-popover';
import SelectionHighlighter from 'react-highlight-selection';

function PersonalReading() {
    const [html, setHtml] = useState('');
    const [currentPageNumber, setCurrentPageNumber] = useState(2);
    
    useEffect(() => {
        axios.get(`http://3.35.27.172:3000/1/${currentPageNumber}`)
        .then((response) => {
            setHtml(response.data.result.pageHtml);
        })
        .catch(() => {
            alert('페이지 로딩에 실패하였습니다.');
        })
        
        // axios.get('url')
        // .then((response) => {
            
        // })
        // .catch(() => {
            
        // })
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
        highlightButton.addEventListener('click', (event) => {
            const selectedText = window.getSelection().toString().trim();
            
            // firefox에서는 range 객체를 여러 개 뽑을 수 있으나(여러 개 drag가 가능하나) chrome에서는 1개의 range 객체만 뽑을 수 있도록 지원한다.
            const range = window.getSelection().getRangeAt(0);
            const span = document.createElement('mark');
            
            span.classList.add('highlighted');
            span.appendChild(range.extractContents());
            console.log("span2 : ", span);
            range.insertNode(span);
            
            console.log('range:', range);
            console.log('span:', span);
            console.log(selectedText);
        })
    }
    
    useEffect(() => {
        let temp = document.querySelector('.y3');
        if (temp) {
            document.querySelector('.y3').classList.add('highlighted');
        }
    });
        
    
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
                            {/* <TempArea1> */}
                            <div style={{margin: 'auto', position: 'relative', width: '100%', height: '130%', overflow: 'hidden'}} dangerouslySetInnerHTML={{ __html: html}}></div>
                            {/* </TempArea1> */}
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
                {/* <aside className="PersonalReading__mostLabeled">
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
                </aside> */}
            </main>
        </>
    );
}

// class TempArea1 extends Component {
//     constructor() {
//       super();
//       this.selectionHandler = this.selectionHandler.bind(this);
//     }
   
//     selectionHandler(selection) {
//       //do something with selection
//       console.log(selection);
   
//     }
//     render() {
//       const text = `<div style={{margin: 'auto', position: 'relative', width: '100%', height: '100%', overflow: 'hidden'}} dangerouslySetInnerHTML={{ __html: html}}></div>`;
//       return (
//         <SelectionHighlighter
//           text={text}
//           selectionHandler={this.selectionHandler}
//           customClass='custom-class'
//         />
//       );
//     }
//   }

export default PersonalReading;