import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Highlight.css'

function HighlightList(props){
    const [Chapter, setChapter] = useState(['ch.01','ch.04','ch.07'])
    const [HighlightText, setHighlightText] = useState(['합리적으로 사고하는 그의 천성이 괴로운 마음을 달래 주었다.', '“많은 사람이 내게 적대적이다. 그들은 내가 부자라고 말한다. 하지만 나는 어느 누구에게도 해를 끼치지 않고 하느님의 은총으로 부자가 되었다.”', '푸거는 유럽에서 가장 강력한 상업 조직이던 한자동맹에 결정적 타격을 입혔다.']);
    
    const [Hover, setHover] = useState(0);

    let navigate = useNavigate();
    // const handlerOver = (e)=>{
    //     setHover(()=>{
    //         return onMouseOver(1);
    //     });
    // }
    
    
    
    

    return (
        <div >
            <ul className='li__color__edit' onClick={() => {navigate('/personalreading')}}><b>ch.1</b>
                <li data-level="0"></li> {/* ← 이거 남겨야 합니다!! */}
                {/* <li data-level="${level}"></li> */}
                {/* 클릭 이벤트도 발생시켜야함 text눌렀을 때, hover도 있고 */}
                {/* <li data-level="1" onMouseOver={(e)=>{this.handlerOver(e);}} onMouseOut={(e)=>{this.handlerOut(e);}}>{HighlightText[0]}</li> */}
                <li data-level="1">p.7 의심되는 자의 무덤을 파서 시체의 썩어 가는 살을</li>
                <li data-level="2">p.8 신이 그가 많은 돈을 벌기를 바라지 않았다면 그에게 그런 재능을 주지 않았으리라는 것이었다.</li>
                <li data-level="3">p.8 자본주의와 공산주의의 첫 대규모 충돌인 독일 농민 전쟁에서는 전쟁 자금을 지원해 자유 기업 체제의 조기 붕괴를 막기도 했다.</li>
            </ul>
        </div>
    )
}

function Highlight(){
    let navigate = useNavigate();

    // /highlights/:pdfIdx

    
    return (
        <main className='Highlight__main'>
            <aside className='Highlight__book'>
                <p className='Highlight__book__image'></p>
                <p className='Highlight__book__text'><b>12%</b> of the book read</p>
                <button className='Highlight__book__reading__btn' onClick={()=>{navigate('/personalreading')}}>Continue reading</button>
            </aside>
            <article className='Highlight__list__article'>
                <section className='Highlight__list__title'>
                    <p style={{ marginBottom: '5px'}} className='Highlight__list__title__name'>자본가의 탄생</p>
                    <h2 style={{ marginTop: '0px'}}>자본은 어떻게 종교와 정치를 압도했는가</h2>
                    <p className='Highlight__list__title__author'>JACOB FUGGER</p>
                </section>
                <section className='Highlight__list__btn'>
                    <div className="Highlight__list__btn__temp">
                        <button className='Highlight__list__btn1'>My Lables</button>
                        {/* <button className='Highlight__list__btn2'>Other's Study Note</button> */}
                        {/* <button className='Highlight__export__btn'>Export</button */}
                    </div>
                </section>
                <section className='Highlight__list'>
                    <HighlightList></HighlightList>
                </section>
            </article>
            <aside className='Highlight__export'>
                <button className='Highlight__export__btn' onClick={() => { navigate('/coeditor') }}>Export</button>
            </aside>
        </main>
    )
}

export default Highlight;