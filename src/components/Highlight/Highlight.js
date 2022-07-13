import { useState } from 'react';
import './Highlight.css'

function HighlightList(){
    const [Chapter, setChapter] = useState(['ch.01','ch.04','ch.07'])
    const [HighlightText, setHighlightText] = useState(['합리적으로 사고하는 그의 천성이 괴로운 마음을 달래 주었다.', '“많은 사람이 내게 적대적이다. 그들은 내가 부자라고 말한다. 하지만 나는 어느 누구에게도 해를 끼치지 않고 하느님의 은총으로 부자가 되었다.”', '푸거는 유럽에서 가장 강력한 상업 조직이던 한자동맹에 결정적 타격을 입혔다.']);
    
    const [Hover, setHover] = useState(0);

    // const handlerOver = (e)=>{
    //     setHover(()=>{
    //         return onMouseOver(1);
    //     });
    // }

    return (
        <div >
            <ul className='li__color__edit'><b>{Chapter[0]}</b>
                <li data-level="0"></li> {/* ← 이거 남겨야 합니다!! */}
                {/* <li data-level="${level}"></li> */}
                {/* 클릭 이벤트도 발생시켜야함 text눌렀을 때, hover도 있고 */}
                {/* <li data-level="1" onMouseOver={(e)=>{this.handlerOver(e);}} onMouseOut={(e)=>{this.handlerOut(e);}}>{HighlightText[0]}</li> */}
                <li data-level="1">{HighlightText[0]}</li>
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
                </section>
            </article>
            <aside className='Highlight__export'>
                <button className='Highlight__export__btn'>Export</button>
            </aside>
        </main>
    )
}

export default Highlight;