import './Library.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Library() {
    const [cookies, setCookie, removeCookie] = useCookies(['id']);
    let navigate = useNavigate();
    console.log(cookies.id);
    
    useEffect(() => {
        axios.post('http://localhost:3001/auth/test', {
            forauthorization: cookies.id
            // credentials: "same-origin",
        })
        .then((response) => {
            // console.log('Authorize Success:', response);
            if (response.data.isSuccess === false) {
                console.log('Authorize Fail')
                navigate('/');
            }
        })
        .catch((error) => {
            console.log(cookies.id);
            console.log('Post Authorize Error', error);
        })
    })
    
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