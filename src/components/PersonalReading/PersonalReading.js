import './PersonalReading.css'
import HTMLRenderer from 'react-html-renderer'
import axios from 'axios';
import { useState } from 'react';

function PersonalReading() {
    let [html, setHtml] = useState('');
    
    // axios.get('url')
    // .then((response) => {
    //     setHtml(response.data.result.pdfHtml);
    // })
    // .catch(() => {
    //     alert('데이터 로딩에 실패했습니다.');
    // })
    
    return (
        <>
            <main className="PersonalReading">
                <article className="PersonalReading__pages">
                    {/* <section className="PersonalReading__pages__leftPage">
                        나는 첫 번째
                    </section> */}
                    <section className="PersonalReading__pages__rightPage">
                        <embed type="text/html" src={process.env.PUBLIC_URL + '/htmlSource/practice.html'} width="100%" height="100%"></embed>
                        {/* <HTMLRenderer html={html}></HTMLRenderer> */}
                    </section>
                    <div className="PersonalReading__pages__buttons">
                <div>앞으로</div>
                <div>뒤로</div>
            </div>
                </article>
                <div className="PersonalReading__pages__buttons">
                        <div>
                            <div></div>
                            <div></div>
                        </div>
                </div>
                <aside className="PersonalReading__mostLabeled">
                    <div className="PersonalReading__mostLabeled__chart">
                        <div className="PersonalReading__mostLabeled__chart--title">
                            <h2 className="PersonalReading__mostLabeled__chart--title--text">Most Labeled</h2>
                        </div>
                        <div className="PersonalReading__mostLabeled__chart--list">
                            <ol>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ol>
                        </div>
                    </div>
                </aside>
            </main>
            
        </>
    );
}

export default PersonalReading;