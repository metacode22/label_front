import { useState } from 'react';
import './Highlight.css'

// const Hover = ()=>{
//     const [Hovering, setHovering] = useState(0);

//     return (
//         <Wrapper
//         onMouseOver={() => setHovering(1)}
//         onMouseOut={() => setHovering(0)}/>
//     )
// }

function HighlightList(){
    const [Chapter, setChapter] = useState(['ch.01','ch.04','ch.07'])
    const [HighlightText, setHighlightText] = useState(['fw1313j131231312oeigjwp', 'iofjqo12313123123wifj', 'kifhqwiodjqowjdo1231312312311q']);
    
    return (
        <div >
            <ul className='li__color__edit'>{Chapter[0]}
                {/* <li data-level="${level}"></li> */}
                {/* 클릭 이벤트도 발생시켜야함 text눌렀을 때, hover도 있고 */}
                <li data-level="1" onMouseOver={(e)=>{this.handlerOver(e);}} onMouseOut={(e)=>{this.handlerOut(e);}}>{HighlightText[0]}</li>
                <li data-level="2">{HighlightText[1]}</li>
                <li data-level="3">{HighlightText[2]}</li>
            </ul>
        </div>
    )
}

function Highlight(){
    return (
        <main className='Highlight__main'>
            <aside className='Highlight__book'>
                <p className='Highlight__book__image'>책 이미지 들어감</p>
                <p className='Highlight__book__text'>중괄호% of the book read</p>
                <button className='Highlight__book__reading__btn'>Continue reading</button>
            </aside>
            <article className='Highlight__list__article'>
                <section className='Highlight__list__title'>
                    <p className='Highlight__list__title__name'>책 이름</p>
                    <p className='Highlight__list__title__author'>책 저자</p>
                </section>
                <section className='Highlight__list__btn'>
                    <button className='Highlight__list__btn1'>My Lables</button>
                    <button className='Highlight__list__btn2'>Other's Study Note</button>
                    {/* <button className='Highlight__export__btn'>Export</button */}
                </section>
                <section className='Highlight__list'>
                    <HighlightList></HighlightList>
                    <HighlightList></HighlightList>
                    <HighlightList></HighlightList>
                    <HighlightList></HighlightList>
                    <HighlightList></HighlightList>
                    <HighlightList></HighlightList>
                    <HighlightList></HighlightList>
                    <HighlightList></HighlightList>
                    <HighlightList></HighlightList>
                    <HighlightList></HighlightList>
                    <HighlightList></HighlightList>
                    <HighlightList></HighlightList>
                    <HighlightList></HighlightList>
                </section>
            </article>
            <aside className='Highlight__export'>
                <button className='Highlight__export__btn'>Export</button>
            </aside>
        </main>
    )
}

export default Highlight;