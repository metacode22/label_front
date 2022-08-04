import "./PersonalReading.css";
import axios from 'axios';
import { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import $ from 'jquery';

// sideComponents
import { WrapperTextEditor } from "./sideComponents/TextEditor/TextEditor.tsx";
import PageRendered from "./sideComponents/PageRendered/PageRendered.js";
import HighlightList from "./sideComponents/HighlightList/HighlightList.js";
import ShowAndHideSwitch from "./sideComponents/ShowAndHideSwitch/ShowAndHideSwitch.js";
import SideBar from './sideComponents/SideBar/SideBar.js';

// sideFunction for highlighting
import { clickHighlight, doHighlight, turnOver, toPdf } from './sideFunction/sideFunction';

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

// mui
import { CircularProgress } from "@mui/material";

function PersonalReading(props) {
    const location = useLocation();
    const { pdfIdx, recentlyReadPage } = location.state;
    const [html, setHtml] = useState('');
    const [updateHighlightList, setUpdateHighlightList] = useState(true);
    const [commitIdx, setCommitIdx] = useState(-1);
    const [markdownValue, setMarkdownValue] = useState({});
    const [highlightData, setHighlightData] = useState([]);
    const [loading, setLoading] = useState(false);
     
    const highlightButtonsWrap = useRef();
    const highlightButton = useRef();
    const highlightButtonPurple = useRef();
    const highlightButtonYellow = useRef();
    
    // 수정 필요, props로 받아야 할 듯.
    // library에서 넘어올 때 currentPageNumber를 유저로부터 가져와야 함.
    // redux?
    const [currentPageNumber, setCurrentPageNumber] = useState(recentlyReadPage);
    
    // library에서 넘어올 때 받아와야 할 듯.
    // useLocation
    let userIdx = 58;
    
    const [currentBookInfo, setCurrentBookInfo] = useState({});

    useEffect(() => {
        axios.get(`https://inkyuoh.shop/users/${userIdx}/pdfs`)
            .then((response) => {
                console.log('TotalPage GET response:', response);
                let newCurrentBookInfo = response.data.result.find(x => x.pdfIdx === pdfIdx);
                setCurrentBookInfo(newCurrentBookInfo);
            })
            .catch((error) => {
                console.log('TotalPage GET Fail, error:', error);
            })
    }, [pdfIdx])

    useEffect(() => {
        if (commitIdx === -1) {
            const getPageLink = async () => {
                const pageLink = await axios.get(`https://inkyuoh.shop/pdfs/${pdfIdx}/pages/${currentPageNumber}`).then((response) => {
                    return response.data.result.pageLink;
                });
                
                const getHtml = await axios.get(`${pageLink}`).then((response) => {
                    setHtml(response.data);
                });
                
                const getHighlightData = await axios.get(`https://inkyuoh.shop/highlights/pdfs/${pdfIdx}/pages/${currentPageNumber}`).then((response) => {
                    setHighlightData(response.data.result);
                })
            }
            
            getPageLink();
        } else {
            const getPageLink = async () => {
                const pageLink = await axios.get(`https://inkyuoh.shop/pdfs/${pdfIdx}/pages/${currentPageNumber}`).then((response) => {
                    return response.data.result.pageLink;
                });
                
                const getHtml = await axios.get(`${pageLink}`).then((response) => {
                    setHtml(response.data);
                });
                
                const getHighlightData = await axios.get(`https://inkyuoh.shop/highlights/pages/${currentPageNumber}/commitIdx/${commitIdx}`).then((response) => {
                    setHighlightData(response.data.result);
                })
            }

            getPageLink();
        }
    }, [currentPageNumber, props.mode, commitIdx])
    
    // Text Editor Value
    useEffect(() => {
        setHtml({...html})
        
        if (commitIdx !== -1) {
            axios.post('https://inkyuoh.shop/commits/books/2/2', {
                    commitIdx: commitIdx
                })
                .then((response) => {
                    return JSON.parse(response.data.result[0].editorLog);
                })
                .then((response) => {
                    console.log(response);
                    setMarkdownValue(response);
                })
        }
    }, [commitIdx])
    
    // Draw Highlight
    useEffect(() => {
        try {
            for (let i = 0; i < highlightData.length; i++) {
                doHighlight(highlightData[i], highlightData[i].highlightIdx);
            }       
        }
        catch {
            // console.log('hello');
        }
    }, [highlightData, commitIdx])
    
    useEffect(() => {
        function selectableTextAreaMouseUp(event) {
            const highlightButtonCurrent = highlightButtonsWrap.current;

            setTimeout(() => {
                if (window.getSelection().toString().trim() != 0) {
                    const x = event.pageX;
                    const y = event.pageY;

                    const highlightButtonCurrentWidth = Number(getComputedStyle(highlightButtonCurrent).width.slice(0, -2));
                    const highlightButtonCurrentHeight = Number(getComputedStyle(highlightButtonCurrent).width.slice(0, -2));

                    highlightButtonCurrent.style.left = `${x - highlightButtonCurrentWidth * 0.5}px`;
                    highlightButtonCurrent.style.top = `${y - highlightButtonCurrentHeight * 1.0}px`;
                    highlightButtonCurrent.style.display = "flex";
                    highlightButtonCurrent.classList.add("btnEntrance");
                }
            }, 0);
        }
        
        const selectableTextArea = document.querySelectorAll(".PersonalReading__mainPage--readingPage");

        selectableTextArea?.forEach((element) => {
            element?.addEventListener("mouseup", selectableTextAreaMouseUp);
            element?.addEventListener('touchend', selectableTextAreaMouseUp, false);
        });

        function documentMouseDown(event) {
            const highlightButtonCurrent = highlightButtonsWrap.current;

            if (highlightButtonCurrent.style.display === "flex" && event.target.classList.contains('specific') === false) {
                
                highlightButtonCurrent.style.display = "none";
                highlightButtonCurrent.classList.remove("btnEntrance");
                window.getSelection().empty();
            }
        }

        document.addEventListener("mousedown", documentMouseDown);
        document.addEventListener('touchstart', documentMouseDown, false);
        
        // selection height 조정
        document.querySelectorAll('.c').forEach((element) => {
            element.style.height = '110%';
        })
        
        document.querySelectorAll('.t').forEach((element) => {
            element.style.height = '2.1em';
        })

        return () => {
            selectableTextArea?.forEach((element) => {
                element?.removeEventListener("mouseup", selectableTextAreaMouseUp);
                element?.removeEventListener("touchend", selectableTextAreaMouseUp);
            });
            
            document.removeEventListener("mousedown", documentMouseDown);
            document.removeEventListener("touchstart", documentMouseDown);
        };
    }, [html])
    
    return (
        <main className="PersonalReading">
            {loading && <CircularProgress className="CircularProgress"></CircularProgress>}
            <div ref={highlightButtonsWrap} className="HighlightButton__wrap">
                <button ref={highlightButton} className="HighlightButton specific"
                    onTouchStart={(event) => {
                        clickHighlight(pdfIdx, currentPageNumber, highlightButtonsWrap, updateHighlightList, setUpdateHighlightList, 'highlightedGreen', event); 
                    }}
                    onClick={() => { clickHighlight(pdfIdx, currentPageNumber, highlightButtonsWrap, updateHighlightList, setUpdateHighlightList, 'highlightedGreen'); }}
                ></button>
                
                <button ref={highlightButtonPurple} className="HighlightButton__purple specific"
                    onTouchStart={(event) => {
                        clickHighlight(pdfIdx, currentPageNumber, highlightButtonsWrap, updateHighlightList, setUpdateHighlightList, 'highlightedPurple', event); 
                    }}
                    onClick={() => { clickHighlight(pdfIdx, currentPageNumber, highlightButtonsWrap, updateHighlightList, setUpdateHighlightList, 'highlightedPurple'); }}
                ></button>
                
                <button ref={highlightButtonYellow} className="HighlightButton__yellow specific"
                    onTouchStart={(event) => {
                        clickHighlight(pdfIdx, currentPageNumber, highlightButtonsWrap, updateHighlightList, setUpdateHighlightList, 'highlightedYellow', event); 
                    }}
                    onClick={() => { clickHighlight(pdfIdx, currentPageNumber, highlightButtonsWrap, updateHighlightList, setUpdateHighlightList, 'highlightedYellow'); }}
                ></button>
            </div>
            
            <div className="PersonalReading__container" style={loading === true ? {opacity: 0.8} : null}>
                <aside className="PersonalReading__sideBar">
                    <SideBar commitIdx={commitIdx} setCommitIdx={setCommitIdx} currentBookInfo={currentBookInfo}></SideBar>
                </aside>
                
                <div className="PersonalReading__mainPage" style={props.mode === true ? {flex: 3} : {flex: 1}}>
                    {props.mode === true ? <article className="PersonalReading__mainPage--readingPage" style={props.mode === true ? {flex: 2} : {flex: 0}}>
                        <PageRendered className="PageRendered" html={html}></PageRendered>
                        <div className="PersonalReading__mainPage--goBackButtons">
                            <FontAwesomeIcon icon={faCaretLeft} className="backButton" onClick={() => {turnOver('back', currentPageNumber, setCurrentPageNumber, currentBookInfo.totalPage);}}></FontAwesomeIcon>
                            <FontAwesomeIcon icon={faCaretRight} className="goButton" onClick={() => {turnOver('go', currentPageNumber, setCurrentPageNumber, currentBookInfo.totalPage);}}></FontAwesomeIcon>
                        </div>
                        <div className="PersonalReading__mainPage--info">
                            <p><input className="PersonalReading__mainPage--info--input" placeholder={currentPageNumber} onKeyUp={(event) => {
                                event.preventDefault();
                                if (window.event.keyCode === 13 && 1 <= event.target.value && event.target.value <= currentBookInfo.totalPage) {
                                    setCurrentPageNumber(Number(event.target.value));
                                    event.target.value = null;
                                }
                            }}></input> / {currentBookInfo.totalPage}</p>
                        </div>
                    </article> 
                    : null}
                    <aside className="PersonalReading__highlightList" style={props.mode === true ? {flex: 1} : {flex: 1}}>
                        <HighlightList commitIdx={commitIdx} setCommitIdx={setCommitIdx} pdfIdx={pdfIdx} totalPage={currentBookInfo.totalPage} currentPageNumber={currentPageNumber} updateHighlightList={updateHighlightList} setUpdateHighlightList={setUpdateHighlightList}></HighlightList>
                        {props.mode === false ?
                        <div className="PersonalReading__highlightList--goBackButtons">
                            <FontAwesomeIcon icon={faCaretLeft} className="backButton--highlightList" onClick={() => {turnOver('back', currentPageNumber, setCurrentPageNumber, currentBookInfo.totalPage);}}></FontAwesomeIcon>
                            <FontAwesomeIcon icon={faCaretRight} className="goButton--highlightList" onClick={() => {turnOver('go', currentPageNumber, setCurrentPageNumber, currentBookInfo.totalPage);}}></FontAwesomeIcon>
                        </div>
                        : null}
                    </aside>
                </div>
                
                <article className="PersonalReading__mainPage--textEditor" style={props.mode === true ? {flex: 1} : {flex: 1}}>
                    <div className="PersonalReading__mainPage--textEditor--wrap">
                        <div className="PersonalReading__mainPage--textEditor--info">
                            <h1>{currentBookInfo.pdfName}</h1>
                            <p>{currentBookInfo.author}</p>
                        </div>
                        <FontAwesomeIcon className="ToPdfButton" icon={faFilePdf} onClick={() => {
                            setLoading(true); 
                            setTimeout(() => {
                                toPdf(currentBookInfo.pdfName, loading, setLoading);
                                setTimeout(() => {
                                    setLoading(false);
                                }, 500);
                            }, 100);
                        }}></FontAwesomeIcon>
                    </div>
                    <WrapperTextEditor markdownValue={markdownValue} commitIdx={commitIdx} userIdx={String(userIdx)} pdfIdx={String(pdfIdx)}></WrapperTextEditor>
                </article>
            </div>
        </main>
    );
}

export default PersonalReading;