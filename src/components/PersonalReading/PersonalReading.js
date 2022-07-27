import "./PersonalReading.css";
import axios from 'axios';
import { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// sideComponents
// import { TextEditor } from "./sideComponents/TextEditor/TextEditor_jun.tsx";
import { TextEditor, WrapperTextEditor } from "./sideComponents/TextEditor/TextEditor.tsx";
import PageRendered from "./sideComponents/PageRendered/PageRendered.js";
import HighlightList from "./sideComponents/HighlightList/HighlightList.js";
import ShowAndHideSwitch from "./sideComponents/ShowAndHideSwitch/ShowAndHideSwitch.js";
import SideBar from './sideComponents/SideBar/SideBar.js';

// sideFunction for highlighting
import { clickHighlight, doHighlight, turnOver } from './sideFunction/sideFunction';

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

function PersonalReading(props) {
    let location = useLocation();
    let { pdfIdx, recentlyReadPage } = location.state;
    let [html, setHtml] = useState('');
    let [updateHighlightList, setUpdateHighlightList] = useState(true);
    
    const highlightButton = useRef();
    
    // 수정 필요, props로 받아야 할 듯.
    // library에서 넘어올 때 currentPageNumber를 유저로부터 가져와야 함.
    // redux?
    let [currentPageNumber, setCurrentPageNumber] = useState(recentlyReadPage);
    
    // library에서 넘어올 때 받아와야 할 듯.
    // useLocation
    let userIdx = 58;
    
    // let [totalPage, setTotalPage] = useState(1);
    let [currentBookInfo, setCurrentBookInfo] = useState({});
    useEffect(() => {
        axios.get(`http://43.200.26.215:3000/users/${userIdx}/pdfs`)
        .then((response) => {
            console.log('TotalPage GET response:', response);
            let newCurrentBookInfo = response.data.result.find(x => x.pdfIdx === pdfIdx);
            // setTotalPage(nowPdf.totalPage)
            setCurrentBookInfo(newCurrentBookInfo);
        })
        .catch((error) => {
            console.log('TotalPage GET Fail, error:', error);
        })
    }, [pdfIdx])
    
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
                            // if (response.data.result[i].active === 1) {
                                // console.log(document.querySelector('.y6'));
                                doHighlight(response.data.result[i], response.data.result[i].highlightIdx);    
                            // }
                        }
                    })
                    // .catch((error) => {
                    //     console.log('highlight data GET Fail, error:', error);
                    // })
            })
    }, [currentPageNumber, props.mode])
    
    useEffect(() => {
        // html이 바뀔 때, 전 페이지를 잡는 에러가 있어서 추가.
        axios.get(`http://43.200.26.215:3000/highlights/pdfs/${pdfIdx}/pages/${currentPageNumber}/`)
            .then((response) => {
                console.log('highlight data GET response:', response);
                
                for(let i = 0; i < response.data.result?.length; i++) {
                    // if (response.data.result[i].active === 1) {
                        // console.log(document.querySelector('.y6'));
                        doHighlight(response.data.result[i], response.data.result[i].highlightIdx);    
                    // }
                }
            })
            // .catch((error) => {
            //     console.log('highlight data GET Fail, error:', error);
            // })
        
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
        
    }, [currentPageNumber, props.mode, html])
    
    return (
        <main className="PersonalReading">            
            <button 
                ref={highlightButton} 
                className="HighlightButton"
                value="this is for documentMouseDown"
                onClick={() => { clickHighlight(pdfIdx, currentPageNumber, highlightButton, updateHighlightList, setUpdateHighlightList); }}
            ></button>
            
            <div className="PersonalReading__container">
                <aside className="PersonalReading__sideBar">
                    <SideBar currentBookInfo={currentBookInfo}></SideBar>
                </aside>
                
                <div className="PersonalReading__mainPage" style={props.mode === true ? {flex: 3} : {flex: 1}}>
                    {props.mode === true ? <article className="PersonalReading__mainPage--readingPage" style={props.mode === true ? {flex: 2} : {flex: 0}}>
                        <PageRendered className="PageRendered" html={html}></PageRendered>
                        <div className="PersonalReading__mainPage--goBackButtons">
                            <FontAwesomeIcon icon={faCaretLeft} className="backButton" onClick={() => {
                                turnOver('back', currentPageNumber, setCurrentPageNumber, currentBookInfo.totalPage);
                            }}></FontAwesomeIcon>
                            <FontAwesomeIcon icon={faCaretRight} className="goButton" onClick={() => {
                                turnOver('go', currentPageNumber, setCurrentPageNumber, currentBookInfo.totalPage);
                            }}></FontAwesomeIcon>
                        </div>
                        <div className="PersonalReading__mainPage--info">
                            <p><input className="PersonalReading__mainPage--info--input" placeholder={currentPageNumber} onKeyUp={(event) => {
                                event.preventDefault();
                                if (window.event.keyCode === 13 && 1 <= event.target.value && event.target.value <= currentBookInfo.totalPage) {
                                    setCurrentPageNumber(Number(event.target.value));
                                }
                            }}></input> / {currentBookInfo.totalPage}</p>
                        </div>
                    </article> 
                    : null}
                    <aside className="PersonalReading__highlightList" style={props.mode === true ? {flex: 1} : {flex: 1}}>
                        <HighlightList pdfIdx={pdfIdx} totalPage={currentBookInfo.totalPage} currentPageNumber={currentPageNumber} updateHighlightList={updateHighlightList} setUpdateHighlightList={setUpdateHighlightList}></HighlightList>
                    </aside>
                </div>
                
                <article className="PersonalReading__mainPage--textEditor" style={props.mode === true ? {width: '368px'} : {flex: 1}}>
                    <div className="PersonalReading__mainPage--textEditor--info">
                        <p style={{ fontSize: '16px' }}>{currentBookInfo.pdfName}</p>
                        <p style={{ fontSize: '12px', textDecoration: 'underline' }}>저장 시 남는 글 - 서버에서 받아와야 함.</p>
                    </div>
                    <WrapperTextEditor></WrapperTextEditor>
                </article>
            </div>
        </main>
    );
}

export default PersonalReading;