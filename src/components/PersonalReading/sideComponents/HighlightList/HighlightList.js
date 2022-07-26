import styles from "./HighlightList.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import SearchBar from '../SearchBar/SearchBar.js';
import HighlightBadge from './HighlightBadge/HighlightBadge.js';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

function HighlightList(props) {
    let [highlightData, setHighlightData] = useState([]);
    
    useEffect(() => {
        async function getHighlightData() {
            await axios.get(`http://43.200.26.215:3000/highlights/pdfs/${74}/pages/${props.currentPageNumber}`)
                .then((response) => {
                    let result = Array();
                    
                    for (let i = 0; i < response.data.result.length; i++) {
                        if (response.data.result[i].active === 1) {
                            result.push(response.data.result[i])
                        }
                    }
                    setHighlightData(result);
                });
        }

        getHighlightData();
    }, [props.currentPageNumber, props.updateHighlightList]);

    return (
        <>
            <div className={styles.title}>Highlights</div>
            <SearchBar pdfIdx={props.pdfIdx} currentPageNumber={props.currentPageNumber} highlightData={highlightData} setHighlightData={setHighlightData}></SearchBar>
            <div className={styles.highlightInfo}>
                <p className={styles.pageNumber}>Page {props.currentPageNumber} / {props.totalPage}</p>
                {/* <HighlightBadge></HighlightBadge> */}
            </div>
            <aside className={styles.wrap}>
                <div className={styles.container}>
                    <HighlightCards
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

    async function deleteHighlight(highlightIdx, setHighlightData, updateHighlightList, setUpdateHighlightList, currentPageNumber) {
        await axios.delete(`http://43.200.26.215:3000/highlights/${highlightIdx}`)
            .then((response) => {
                console.log("highlight delete response:", response);
                
            })
            .catch((error) => {
                console.log("highlight delete error:", error);
            })
            .then(async () => {
                await axios.get(`http://43.200.26.215:3000/highlights/pdfs/${74}/pages/${currentPageNumber}`)
                    .then((response) => {
                        let result = Array();
                        for (let i = 0; i < response.data.result.length; i++) {
                            if (response.data.result[i].active === 1) {
                                result.push(response.data.result[i]);
                            }
                        }
                        
                        console.log(response.data.result);
                        console.log(result);
                        setHighlightData(result);
                        setUpdateHighlightList(!updateHighlightList);
                        const selectedHighlight = document.getElementsByClassName('highlight' + highlightIdx);
                        
                        for (let i = 0; i < selectedHighlight.length; i++) {
                            selectedHighlight[i].classList.remove('highlighted', `${highlightIdx}`);
                        }
                    })
            })
    }

    return (
        <>
            {props.highlightData?.map(function (element, index) {
                return (
                    <>
                        <Card sx={{ width: '100%', minWidth: 275, marginBottom: 1 }} key={index}>
                            <CardHeader 
                                sx={{ paddingBottom: 0 }} 
                                avatar={<Avatar sx={{ bgcolor: "#4DABB3", width: 10, height: 10 }} aria-label="recipe">{""}</Avatar>}
                                title={<p style={{ color: "#DDDDDD" }}></p>}
                                action={
                                    <IconButton onClick={() => { deleteHighlight( element.highlightIdx, props.setHighlightData, props.updateHighlightList, props.setUpdateHighlightList, props.currentPageNumber ); }}>
                                        <ClearIcon fontSize="small"></ClearIcon>
                                    </IconButton>
                                }
                            /><CardContent>
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
