import styles from './HighlightList.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function HighlightList(props) {
    let [HighlightData, setHighlightData] = useState([]);
    useEffect(() => {
        async function getHighlightData() {
            await axios.get(`http://3.35.27.172:3000/highlights/pdfs/${1}/pages/${props.currentPageNumber}`)
            .then((response) => {
                setHighlightData(response.data.result);
            })
        }
        
        getHighlightData();
        
    }, [props.currentPageNumber])
    
    return (
        <aside className={styles.container}>
            <HighlightBlocks list={HighlightData}></HighlightBlocks>
        </aside>
    )
}

function HighlightBlocks(props) {
    return (
        <>
            {props.list.map(function(element, index) {
                return (
                    <ul key={index} draggable='true'>
                        <li>{element.data}</li>
                    </ul>
                )
            })}
        </>
    )
}

export default HighlightList;