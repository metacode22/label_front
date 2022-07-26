import styles from './Userpage.module.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Userpage(){
    return(
        <main>
            <article>
                <section>
                    <div className={styles.divText}><h2>My Page</h2></div>
                    <div>
                        {/* 이미지 받아와야 하고 */}
                        <img src={process.env.PUBLIC_URL + `/images/example.png`}></img>
                        <p>My Profile</p>
                        <p>Super Man</p>

                    </div>

                </section>
                <section>
                    <div className={styles.divText}><h2>My Library</h2></div>
                </section>
            </article>
        </main>
    )
}