import './Library.css';
import { useState } from 'react';
import axios from 'axios';

function Library() {
    // books라는 데이터를 books.js에 담는 방식도 고려해봐야 될 듯
    let [booksRecent, setBooks] = useState([]);
    
    /* <axios> */
    // axios.get('url')
    // .then((result) => {
    //     let newBooks = [...booksRecent];
    //     // newBooks = [...books, ...result.data];
    //     result.data.forEach((element) => {
    //         newBooks.push(element);
    //     })
    //     setBooks(newBooks);
    // })
    // .catch(() => {
    //     alert('axios GET 실패');
    // });
    
    // function CardsRecentShow() {
    //     let CardsArray = Array();
        
    //     for (let i = 0; i < 5; i++) {
    //         CardsArray.push(CardRecent(booksRecent[i]));
    //     }
        
    //     return CardsArray;
    // }
    
    return (
        <main>
            <article className="Library__container">
                <section className="Library__recentlyRead">
                    <div className="Library__recentlyRead__text">
                        <h2>Recently Read</h2>
                    </div>
                    <div className="Library__recentlyRead__cards__container">
                    {/* 1 */}
                        {/* {booksRecent.map(function(element, index) {
                            return (
                                // 백엔드팀이랑 data 네이밍 정할 필요 있음.
                                <CardRecent bookRecent={element} key={index}></CardRecent>  
                            );
                        })} */}
                        
                    {/* 2 */}
                        {/* {CardsRecentShow()} */}
                        
                    {/* 3 */}
                        {/* 일단 이렇게 단순히 짜둠. */}
                        {/* <CardRecent bookRecent={booksRecent[0]} key={0}></CardRecent>  
                        <CardRecent bookRecent={booksRecent[1]} key={1}></CardRecent>  
                        <CardRecent bookRecent={booksRecent[2]} key={2}></CardRecent>  
                        <CardRecent bookRecent={booksRecent[3]} key={3}></CardRecent>  
                        <CardRecent bookRecent={booksRecent[4]} key={4}></CardRecent>   */}
                    </div>
                </section>
                <section className="Library__recommend">
                    <h2>How about this one?</h2>
                </section>
            </article>
        </main>
    );
}

function CardRecent(props) {
    return (
        <div className="Library__recentlyRead__cards__card">
            {/* background에 이미지 어떻게 박을까? */}
            <div className="Library__recentlyRead__cards__card__bookImage">
                {/* CSS hover 필요 */}
                <button className="Library__recentlyRead__cards__card__bookImage--readButton">Read</button>
                <button className="Library__recentlyRead__cards__card__bookImage--highlightButton">Highlights</button>
            </div>
            <div className="Library__recentlyRead__cards__content">
                <div className="Library__recentlyRead__cards__card__content--title">{props.bookRecent.title}</div>
                <div className="Library__recentlyRead__cards__card__content--currentReadingPage">{props.bookRecent.currentReadingPage}</div>
            </div>
        </div>
    );
}

function CardRecommend() {
    
}

export default Library;