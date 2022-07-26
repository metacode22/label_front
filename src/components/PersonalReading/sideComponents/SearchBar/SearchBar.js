import axios from 'axios';
import { useEffect } from 'react';
import styles from './SearchBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchBar(props) { 
    function handleSubmit(event) {
        event.preventDefault();
    }
    
    function handleSearchChange(event) {
        if (event.target.value === '') {
            async function getHighlightData() {
                await axios.get(`http://43.200.26.215:3000/highlights/pdfs/${74}/pages/${props.currentPageNumber}`)
                    .then((response) => {
                        let result = Array();
                        
                        for (let i = 0; i < response.data.result.length; i++) {
                            if (response.data.result[i].active === 1) {
                                result.push(response.data.result[i])
                            }
                        }
                        props.setHighlightData(result);
                    });
            }
    
            getHighlightData();
        } else {
            axios.get(`http://43.200.26.215:3000/pdfs/${props.pdfIdx}/highlights/search?keyword=${event.target.value}`)
                .then((response) => {
                    console.log('Search highlight data response:', response);
                    props.setHighlightData(response.data.result);
                })
                .catch((error) => {
                    console.log('Search highlight data Fail, error:', error);
                })
        }
    }
    
    return (
        <form className={styles.searchBar} onSubmit={(event) => { handleSubmit(event) }}>
            <button className={styles.searchButton}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon}></FontAwesomeIcon>
            </button>
            <input className={styles.searchInput} type="text" id="search" onChange={handleSearchChange} placeholder={'검색어를 입력해주세요.'}></input>
        </form>
    )
}

export default SearchBar;