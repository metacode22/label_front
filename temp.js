import './PersonalReading.css'
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

function PersonalReading() {
    let pdfIdx = 1;
    let [html, setHtml] = useState(null);
    let [currentPageNumber, setCurrentPageNumber] = useState(8);
    let [temp, setTemp] = useState(0);
    // const selectableTextArea = useRef();
    const highlightButton = useRef();
    

    console.log(1);
    useEffect(() => {
        axios.get(`http://3.35.27.172:3000/pdfs/${pdfIdx}/${currentPageNumber}`)
        .then((response) => {
            setHtml(response.data.result.pageHtml);
            console.log(2, 'useEffect - axios');
        })
        .catch(() => {
            alert('페이지 로딩에 실패하였습니다.');
        })
    }, [currentPageNumber])
    
    useEffect(() => {
        console.log(3, 'useEffect - highlightButton');
        
        const selectableTextArea = Array.from(document.querySelectorAll(".PersonalReading__pages__rightPage"));
        console.log(selectableTextArea);
    }, [])
    
    function selectableTextAreaMouseUp() {
        
    }
     
    return (
        <main className="PersonalReading">
            <article className="PersonalReading__pages">
                <section className="PersonalReading__pages__rightPage" onMouseUp={() => {selectableTextAreaMouseUp()}}>
                    <HtmlRendered html={html}></HtmlRendered>
                </section>
                <div>
                    <button className="prevButton" onClick={() => { setCurrentPageNumber(currentPageNumber - 1) }}>&lt;</button>
                    <button className="nextButton" onClick={() => { setCurrentPageNumber(currentPageNumber + 1) }}>&gt;</button>
                </div>
            </article>
            <button className="HighlightButton" ref={highlightButton} onClick={() => { setTemp(temp + 1) }}></button>
        </main>
    )
}

function HtmlRendered(props) {
    return (
        <div style={{margin: 'auto', position: 'relative', width: '100%', height: '100%', overflow: 'auto'}} dangerouslySetInnerHTML={{ __html: props.html}}></div>
    )
}

export default PersonalReading;