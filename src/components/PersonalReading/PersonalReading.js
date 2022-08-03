import "./PersonalReading.css";
import axios from 'axios';
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
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

function PersonalReading(props) {
    let navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    useEffect(() => {
        if (location.state === null) {
            navigate('/library');
        }
    }, [])

    const { pdfIdx, recentlyReadPage } = location.state;
    const [html, setHtml] = useState('');
    const [updateHighlightList, setUpdateHighlightList] = useState(true);
    const [commitIdx, setCommitIdx] = useState(-1);
    const [markdownValue, setMarkdownValue] = useState({});
    const [highlightData, setHighlightData] = useState([]);
     
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
    
    // let [totalPage, setTotalPage] = useState(1);
    const [currentBookInfo, setCurrentBookInfo] = useState({});
    
    useEffect(() => {
        // console.log('hello1');
        axios.get(`https://inkyuoh.shop/users/${userIdx}/pdfs`)
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
        
        
        
        // if (commitIdx === -1) {
        //     axios.get(`https://inkyuoh.shop/pdfs/${pdfIdx}/pages/${currentPageNumber}`)
        //         .then((response) => {
        //             console.log('pageLink GET response:', response);      
                    
        //             return response.data.result.pageLink;
        //         })
        //         .catch((error) => {
        //             console.log('pageLink GET Fail, error:', error);
        //         })
        //         .then((pageLink) => {
        //             axios.get(`${pageLink}`)
        //                 .then((response) => {
        //                     console.log('html GET response:', response);
        //                     setHtml(response.data);
        //                 })
        //         })
        //         .catch((error) => {
        //             console.log('html GET Fail, error:', error);
        //         })
        //         .then(() => {
        //             axios.get(`https://inkyuoh.shop/highlights/pdfs/${pdfIdx}/pages/${currentPageNumber}`)
        //                 .then((response) => {
        //                     console.log('highlight data GET response:', response);
        //                     setHighlightData(response.data.result);
        //                 })
        //                 // .catch((error) => {
        //                 //     console.log('highlight data GET Fail, error:', error);
        //                 // })
        //         })
        // } else {
        //     axios.get(`https://inkyuoh.shop/pdfs/${pdfIdx}/pages/${currentPageNumber}`)
        //         .then((response) => {
        //             console.log('pageLink GET response:', response);      
                    
        //             return response.data.result.pageLink;
        //         })
        //         .catch((error) => {
        //             console.log('pageLink GET Fail, error:', error);
        //         })
        //         .then((pageLink) => {
        //             axios.get(`${pageLink}`)
        //                 .then((response) => {
        //                     console.log('html GET response:', response);
        //                     setHtml(response.data);
        //                 })
        //         })
        //         .catch((error) => {
        //             console.log('html GET Fail, error:', error);
        //         })
        //         .then(() => {
        //             axios.get(`https://inkyuoh.shop/highlights/pages/${currentPageNumber}/commitIdx/${commitIdx}`)
        //                 .then((response) => {
        //                     console.log('Commit highlight data GET response:', response);
        //                     setHighlightData(response.data.result);
        //                 })
        //         })
        // }
        
    }, [currentPageNumber, props.mode, commitIdx])
    
    useEffect(() => {
        // console.log('hello3');
        // html이 바뀔 때, 전 페이지를 잡는 에러가 있어서 추가.
        // if (commitIdx === -1) {
        //     axios.get(`https://inkyuoh.shop/highlights/pdfs/${pdfIdx}/pages/${currentPageNumber}/`)
        //         .then((response) => {
        //             console.log('highlight data GET response:', response);
                    
        //             for(let i = 0; i < response.data.result?.length; i++) {
        //                 setHighlightData(response.data.result);
        //             }
        //         })
        //     // .catch((error) => {
        //     //     console.log('highlight data GET Fail, error:', error);
        //     // })
        // } else {
        //     axios.get(`https://inkyuoh.shop/highlights/pages/${currentPageNumber}/commitIdx/${commitIdx}`)
        //         .then((response) => {
        //             console.log('Commit highlight data GET response:', response);
        //             setHighlightData(response.data.result);
        //         })
        // }
        
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

        return () => {
            document.removeEventListener("mousedown", documentMouseDown);
            selectableTextArea?.forEach((element) => {
                element?.removeEventListener("mouseup", selectableTextAreaMouseUp);
            });
        };
    }, [html])
    
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
        // document.querySelectorAll('.t.h2').forEach((element) => {
        //     element.style.height = '80px';
        // })
        
        // document.querySelectorAll('.t.h3').forEach((element) => {
        //     element.style.height = '108px';
        // })
        
        document.querySelectorAll('.c').forEach((element) => {
            element.style.height = '110%';
        })
        
        document.querySelectorAll('.t').forEach((element) => {
            element.style.height = '2.1em';
            // element.style.width = '1.2em';
        })
    }, [html])
      
    useEffect(() => {
        function bubbleStop(event) {
            // var parentSelector = '.PersonalReading__mainPage--readingPage';
            
            // if(e.target.closest(parentSelector)) {
            //     event.preventDefault();   
            // }
            
            event.preventDefault();
        }
        
        document.addEventListener('touchend', bubbleStop, false);
        document.addEventListener('touchmove', bubbleStop, false);
        document.addEventListener('touchend', bubbleStop, false);
        
        $('.HighlightButton').on('click touchstart', function() {
            clickHighlight(pdfIdx, currentPageNumber, highlightButtonsWrap, updateHighlightList, setUpdateHighlightList, 'highlightedGreen');
        });
        
        $('.HighlightButton__purple').on('click touchstart', function() {
            clickHighlight(pdfIdx, currentPageNumber, highlightButtonsWrap, updateHighlightList, setUpdateHighlightList, 'highlightedPurple');
        });
        
        $('.HighlightButton__yellow').on('click touchstart', function() {
            clickHighlight(pdfIdx, currentPageNumber, highlightButtonsWrap, updateHighlightList, setUpdateHighlightList, 'highlightedYellow');
        });
        
    }, [html])
    
    return (
        <main className="PersonalReading">
            
            <div ref={highlightButtonsWrap} className="HighlightButton__wrap">
                <button ref={highlightButton} className="HighlightButton specific"
                    // onTouchStart={() => { clickHighlight(pdfIdx, currentPageNumber, highlightButtonsWrap, updateHighlightList, setUpdateHighlightList, 'highlightedGreen'); }}
                    onClick={() => { clickHighlight(pdfIdx, currentPageNumber, highlightButtonsWrap, updateHighlightList, setUpdateHighlightList, 'highlightedGreen'); }}
                ></button>
                
                <button ref={highlightButtonPurple} className="HighlightButton__purple specific"
                    onTouchStart={() => { clickHighlight(pdfIdx, currentPageNumber, highlightButtonsWrap, updateHighlightList, setUpdateHighlightList, 'highlightedPurple'); }}
                    onClick={() => { clickHighlight(pdfIdx, currentPageNumber, highlightButtonsWrap, updateHighlightList, setUpdateHighlightList, 'highlightedPurple'); }}
                ></button>
                
                <button ref={highlightButtonYellow} className="HighlightButton__yellow specific"
                    onTouchStart={() => { clickHighlight(pdfIdx, currentPageNumber, highlightButtonsWrap, updateHighlightList, setUpdateHighlightList, 'highlightedYellow'); }}
                    onClick={() => { clickHighlight(pdfIdx, currentPageNumber, highlightButtonsWrap, updateHighlightList, setUpdateHighlightList, 'highlightedYellow'); }}
                ></button>
            </div>
            
            <div className="PersonalReading__container">
                <aside className="PersonalReading__sideBar">
                    <SideBar commitIdx={commitIdx} setCommitIdx={setCommitIdx} currentBookInfo={currentBookInfo}></SideBar>
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
                        <HighlightList commitIdx={commitIdx} setCommitIdx={setCommitIdx} pdfIdx={pdfIdx} totalPage={currentBookInfo.totalPage} currentPageNumber={currentPageNumber} updateHighlightList={updateHighlightList} setUpdateHighlightList={setUpdateHighlightList}></HighlightList>
                    </aside>
                </div>
                
                <article className="PersonalReading__mainPage--textEditor" style={props.mode === true ? {flex: 1} : {flex: 1}}>
                    <div className="PersonalReading__mainPage--textEditor--wrap">
                        <div className="PersonalReading__mainPage--textEditor--info">
                            <p style={{ fontSize: '16px' }}>{currentBookInfo.pdfName}</p>
                            <p style={{ fontSize: '12px', textDecoration: 'underline' }}>5분 전에 수정하였습니다.</p>
                        </div>
                        <FontAwesomeIcon className="ToPdfButton" icon={faFilePdf} onClick={() => { 
                            setTimeout(() => {
                                toPdf(currentBookInfo.pdfName);   
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