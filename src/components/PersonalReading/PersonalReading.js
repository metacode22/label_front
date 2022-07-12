import './PersonalReading.css'
import HTMLRenderer from 'react-html-renderer'
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';

import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import { faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PersonalReading() {
    let [html, setHtml] = useState('');
    let [currentPageNumber, setCurrentPageNumber] = useState(1);
    
    let selectableTextArea = useRef();
    let highlightButton = useRef();
    
    // url : 3.35.27.172:3000/1/1 ~ 8
    /* HTML 데이터 받아오기 */
    // axios.get(`http://3.35.27.172:3000/1/${currentPageNumber}`)
    // .then((response) => {
    //     setHtml(response.data.result.pageHtml);
    //     // console.log(response.data.result.pageHtml);
    // })
    // .catch(() => {
    //     alert('데이터 로딩에 실패했습니다.');
    // })
    
    
    useEffect(() => {
        axios.get(`http://3.35.27.172:3000/1/${currentPageNumber}`)
        .then((response) => {
            setHtml(response.data.result.pageHtml);
        })
        .catch(() => {
            alert('페이지 로딩에 실패하였습니다.');
        })
        
        // let temp = document.querySelectorAll(".PersonalReading__pages__rightPage");
        // let temp2 = document.querySelector(".PersonalReading__pages__rightPage");
        
        // console.log(temp);
        // temp.forEach((element) => {
        //     if (element === temp2) {
        //         console.log(true);
        //     }
        // })
        // console.log(temp2);
        // console.log(selectableTextArea.current)
        // selectableTextArea.current.forEach((elem) => {console.log(elem)});
    }, [currentPageNumber])
    
    return (
        <>
            <main className="PersonalReading">
                <article className="PersonalReading__pages">
                    {/* <section className="PersonalReading__pages__leftPage">
                        나는 첫 번째
                    </section> */}
                    {/* <section className="PersonalReading__pages__rightPage" ref={realPage} dangerouslySetInnerHTML={{ __html: html }}> */}
                    <section className="PersonalReading__pages__rightPage" ref={selectableTextArea}>
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
                    <button id="HighlightButton" ref={highlightButton}><FontAwesomeIcon icon={faTags}></FontAwesomeIcon></button>
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

// function HtmlPage() {
//     let [html, setHtml] = useState('');
    
//     axios.get('http://3.35.27.172:3000/1/3')
//     .then((response) => {
//         console.log(response);
//         setHtml(response.data.result.pageHtml);
//     })
    
//     return (
//         <div dangerouslySetInnerHTML={{
//             __html: html
//         }}></div>
//     )
// }

export default PersonalReading;