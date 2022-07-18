import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Highlight.css'

function HighlightList(props){
    // const [Page, setPage] = useState([])
    // const [HighlightText, setHighlightText] = useState([]);
    let [result, setResult] = useState([]);

    let pdfIdx = 1;

    useEffect(()=>{
        fetch(`http://3.35.27.172:3000/highlights/pdfs/${pdfIdx}`)
        .then(res => {
            return res.json();
        })
        .then(res => {
            setResult(res.result);
            // console.log(res.result);

            // for (let i = 0; i<result.length; i++){
            //     // console.log(result[i].data)
            //     setHighlightText(result[i].data)
            // }

            // const listData = result.map((list)=> {
                // console.log(list)
                // console.log(list.data)
                // console.log(list.pageNum)

                // <li key={list.highlightIdx}>{list.data}</li>
                
                // setHighlightText(list.data)
                // setPage(list.pageNum),
            //     }
            // )
            // return <ul>{listData}</ul>
            // return <li data-level="1">{listData}</li>

            // const listPage = result.map((list)=> setPage(list.pageNum))
        })
    }, []);

    return (
        <div >
            <ul className='li__color__edit'>
                <li data-level="0"></li> {/* ← 이거 남겨야 합니다!! */}
                {/* <li data-level="${level}"></li> */}
                {/* {HighlightText.map(data=>(
                    <li key={data.highlightIdx} data={data}>{data}</li>
                ))} */}
                {/* <li data-level="1">{props.listData}</li> */}
                {/* {console.log(props.listData)} */}
                {/* <li data-level="2">p.{Page}, {HighlightText}</li>
                <li data-level="3">p.{Page}, {HighlightText}</li> */}
                <ListTempShow list={result} length={result.length}></ListTempShow>
            </ul>
        </div>
    )
}

function ListTempShow(props) {
    // console.log('hi', props.list.length);
    let navigate = useNavigate();

    const rendering = () => {
        const result = Array();

        for (let i = 0; i < props.length; i++) {
            // result.push(<li data-level={i + 1}>p.{props.list[i].pageNum}, {props.list[i].data}</li>) // 나중에 색 구분할 거면 이렇게 써야함
            result.push(<li key={i} onClick={()=>{navigate(`/personalreading/pdfs/${props.list[i].userBookIdx}/pages/${props.list[i].pageNum}`)}}>p.{props.list[i].pageNum}, {props.list[i].data}</li>)
        }

        return result;
    }

    return rendering()
}

function Highlight(){
    let navigate = useNavigate();
    
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