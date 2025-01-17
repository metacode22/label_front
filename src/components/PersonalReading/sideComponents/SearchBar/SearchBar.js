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
            async function getInitialHighlightData() {
                await axios.get(`https://inkyuoh.shop/highlights/pdfs/${props.pdfIdx}/pages/${props.currentPageNumber}`)
                    .then((response) => {
                        console.log('Search highlight data response:', response);
                        props.setHighlightData(response.data.result)
                    })
                    .catch((error) => {
                        console.log('Search highlight data Fail, error:', error);
                    })
            }
    
            getInitialHighlightData();
        } else {
            async function getHighlightData() {
                await axios.get(`https://inkyuoh.shop/pdfs/${props.pdfIdx}/highlights/search?keyword=${event.target.value}`)
                    .then((response) => {
                        console.log('Search highlight data response:', response);
                        props.setHighlightData(response.data.result.sort((x, y) => x.pageNum - y.pageNum));
                    })
                    .catch((error) => {
                        console.log('Search highlight data Fail, error:', error);
                    })
            }
            
            getHighlightData();
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