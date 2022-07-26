import styles from './SearchBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchBar() {
    const handleSubmit = (event) => { event.preventDefault() };
    
    const handleSearchChange = (event) => {};
    
    return (
        <form className={styles.searchBar} onSubmit={handleSubmit}>
            <button className={styles.searchButton}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon}></FontAwesomeIcon>
            </button>
            <input className={styles.searchInput} type="text" id="search" onChange={handleSearchChange} placeholder={'검색어를 입력해주세요.'}></input>
        </form>
    )
}

export default SearchBar;