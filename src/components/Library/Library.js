import './Library.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Library() {
    // useEffect(() => {
    //     axios.get('url')
    //     .then((response) => {
    //         console.log('axios GET Success:', response);
    //     })
    //     .catch((error) => {
    //         console.log('axops GET Fail:', error);
    //     })
    // }, [])
    
    return (
        <main>
            <article className="Library__container">
                <section className="Library__recentlyRead">
                    <div className="Library__recentlyRead__text">
                        <h2>Recently Read</h2>
                    </div>
                    <div className="Library__recentlyRead__cards__container">
                        <CardRecentShow></CardRecentShow>
                    </div>
                </section>
                <section className="Library__recommend">
                    {/* <h2>How about this one?</h2> */}
                </section>
            </article>
        </main>
    );
}

function CardRecentShow() {
    const rendering = () => {
        const result = Array();
        
        for (let index = 0; index < 5; index++) {
            result.push(<CardRecent key={index}></CardRecent>);
        }
        
        return result;
    }
    
    return <>{rendering()}</>
}

function CardRecent(props) {
    let navigate = useNavigate();
    
    return (
        <div className="Library__recentlyRead__cards__card">
            <div className='Library__recentlyRead__cards__card__bookImage' style={{
                backgroundImage: "url(" + `${process.env.PUBLIC_URL + '/images/jacobfugger.png'}`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }}>
                <div className="Library__recentlyRead__cards__card__buttons">
                    <button className="Library__recentlyRead__cards__card__bookImage--readButton" onClick={()=>navigate('/personalreading')}>Read</button>
                    <button className="Library__recentlyRead__cards__card__bookImage--highlightButton" onClick={()=>navigate('/highlight')}>Highlights</button>
                </div>
            </div>
            <div className="Library__recentlyRead__cards__card__contents">
                <div className="Library__recentlyRead__cards__card__contents--title">I'm Title</div>
                <div className="Library__recentlyRead__cards__card__contents--readingPage">I'm ReadingPage</div>
            </div>
        </div>
    )
}

function CardRecommend() {
    
}

export default Library;