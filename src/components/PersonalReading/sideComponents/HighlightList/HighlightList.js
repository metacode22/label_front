import styles from "./HighlightList.module.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import SearchBar from '../SearchBar/SearchBar.js';
import HighlightBadge from './HighlightBadge/HighlightBadge.js';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

function HighlightList(props) {
    const [highlightData, setHighlightData] = useState([]);
    
    useEffect(() => {
        if (props.commitIdx === -1) {
            async function getHighlightData() {
                await axios.get(`https://inkyuoh.shop/highlights/pdfs/${props.pdfIdx}/pages/${props.currentPageNumber}`)
                    .then((response) => {
                        setHighlightData(response.data.result);
                    });
            }
            
            getHighlightData();
        }
        
        else {
            async function getHighlightData() {
                await axios.get(`https://inkyuoh.shop/highlights/pages/${props.currentPageNumber}/commitIdx/${props.commitIdx}`)
                    .then((response) => {
                        setHighlightData(response.data.result);
                    })
            }
            
            getHighlightData();
        }
    }, [props.currentPageNumber, props.updateHighlightList, props.commitIdx]);

    return (
        <>
            <div></div>
            <div className={styles.title}>Highlights</div>
            <SearchBar pdfIdx={props.pdfIdx} currentPageNumber={props.currentPageNumber} highlightData={highlightData} setHighlightData={setHighlightData}></SearchBar>
            <div className={styles.highlightInfo}>
                {/* <p className={styles.pageNumber}>Page {props.currentPageNumber} / {props.totalPage}</p> */}
                {/* <HighlightBadge></HighlightBadge> */}
            </div>
            <aside className={styles.wrap}>
                <div className={styles.container}>
                    <HighlightCards
                        commitIdx={props.commitIdx}
                        pdfIdx={props.pdfIdx}
                        highlightData={highlightData}
                        setHighlightData={setHighlightData}
                        style={{ overflow: "scroll" }}
                        updateHighlightList={props.updateHighlightList}
                        setUpdateHighlightList={props.setUpdateHighlightList}
                        currentPageNumber={props.currentPageNumber}
                    ></HighlightCards>
                </div>
            </aside>
        </>
    );
}

function HighlightCards(props) {
    function dragStart_handler(event) {
        event.dataTransfer.setData("text/plain", event.target.innerHTML);
    }

    async function deleteHighlight(commitIdx, highlightIdx, setHighlightData, updateHighlightList, setUpdateHighlightList, currentPageNumber) {
        
        if (commitIdx === -1) {
            await axios.delete(`https://inkyuoh.shop/highlights/${highlightIdx}`)
                .then((response) => {
                    console.log("highlight delete response:", response);
                })
                .catch((error) => {
                    console.log("highlight delete error:", error);
                })
                .then(async () => {
                    await axios.get(`https://inkyuoh.shop/highlights/pdfs/${props.pdfIdx}/pages/${currentPageNumber}`)
                        .then((response) => {
                            setHighlightData(response.data.result);
                            setUpdateHighlightList(!updateHighlightList);
                            const selectedHighlight = document.getElementsByClassName('highlight' + highlightIdx);
                            
                            for (let i = 0; i < selectedHighlight.length; i++) {
                                if (selectedHighlight[i].classList.contains('highlightedGreen') === true) {
                                    selectedHighlight[i].classList.remove('highlightedGreen');
                                }
                                
                                if (selectedHighlight[i].classList.contains('highlightedPurple') === true) {
                                    selectedHighlight[i].classList.remove('highlightedPurple');
                                }
                                
                                if (selectedHighlight[i].classList.contains('highlightedYellow') === true) {
                                    selectedHighlight[i].classList.remove('highlightedYellow');
                                }
                            }
                        })
                })
        }
    }
    console.log(props.highlightData);
    return (
        <>
            {props.highlightData?.map(function (element, index) {
                return (
                    <>
                        <Card sx={{ width: '100%', minWidth: 275, marginBottom: 1 }} key={index}>
                            <CardHeader 
                                sx={{ paddingBottom: 0 }}
                                avatar={<Avatar sx={{ width: 10, height: 10, bgcolor: element.color === 0 ? '#93E7A2' : element.color === 1 ? '#9747FF' : element.color === 2 ? '#FFD644' : null}} 
                                aria-label="recipe">{""}</Avatar>}
                                title={'p.' + `${element.pageNum}`}
                                action={props.commitIdx === -1 ?
                                    <IconButton onClick={() => { deleteHighlight( props.commitIdx, element.highlightIdx, props.setHighlightData, props.updateHighlightList, props.setUpdateHighlightList, props.currentPageNumber ); }}>
                                        <ClearIcon fontSize="small"></ClearIcon>
                                    </IconButton>
                                    : null
                                }
                            /><CardContent sx={{ paddingTop: '4px'}}>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" draggable="true" onDragStart={(event) => { dragStart_handler(event); }}>
                                    {element.data}
                                </Typography>
                            </CardContent>
                        </Card>
                    </>
                );
            })}
        </>
    );
}

export default HighlightList;
