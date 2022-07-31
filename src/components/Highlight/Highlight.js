import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Highlight.css";
import axios from "axios";

function HighlightList() {
    let [result, setResult] = useState([]);

    let pdfIdx = 1;

    useEffect(() => {
        fetch(`https://inkyuoh.shop/highlights/pdfs/${pdfIdx}`)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setResult(res.result);
                // console.log(res.result);
            });
    }, []);

    return (
        <div>
            <ul className="li__color__edit">
                <li data-level="0"></li> {/* ← 이거 남겨야 합니다!! */}
                <HighlightListShow
                    list={result}
                    length={result.length}
                ></HighlightListShow>
            </ul>
        </div>
    );
}

function TitleList() {
    let [result, setResult] = useState([]);

    let userIdx = 58;

    useEffect(() => {
        fetch(`https://inkyuoh.shop/users/${userIdx}/pdfs`)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setResult(res.result);
            });
    }, []);

    return <TitleShow title={result} length={result.length}></TitleShow>;
}

function HighlightListShow(props) {
    // console.log(props.length)
    let navigate = useNavigate();

    const rendering = () => {
        const result = Array();

        for (let i = 0; i < props.length; i++) {
            // result.push(<li data-level={i + 1}>p.{props.list[i].pageNum}, {props.list[i].data}</li>) // 나중에 색 구분할 거면 이렇게 써야함
            // result.push(<li key={i} onClick={()=>{navigate(`/personalreading/pdfs/${props.list[i].userBookIdx}/pages/${props.list[i].pageNum}`)}}>p.{props.list[i].pageNum}, {props.list[i].data}</li>)
            result.push(
                <li
                    key={i}
                    onClick={() => {
                        navigate(`/personalreading`, {
                            state: props.list[i].pageNum,
                        });
                    }}
                >
                    p.{props.list[i].pageNum}, {props.list[i].data}
                </li>
            );
        }

        return result;
    };

    return rendering();
}

function TitleShow(props) {
    // console.log(props.length)
    const rendering = () => {
        const result = Array();

        // for (let i = 0; i < props.length; i++) {
            result.push(
                <>
                    {/* <p className='Highlight__list__title__name' key={i}>{props.title[i].pdfName}</p> */}
                    <p className='Highlight__list__title__name'>{props.title.pdfName}</p>
                    {/* <h2 style={{ marginTop: '0px'}} key={i}>{props.title[i].subTitle}</h2> */}
                    <h2 style={{ marginTop: '0px'}}>{props.title.subTitle}</h2>
                    {/* <p className='Highlight__list__title__author' key={i}>{props.title[i].author}</p> */}
                    <p className='Highlight__list__title__author'>{props.title.author}</p>
                </>
            )
        // }
        // ↑ key값들도 수정해야함 + 윗단 주석들 아무것도 지우면 안댐! 다시 사용할 코드들
        return result;
    };

    return rendering();
}

function Highlight() {
    let navigate = useNavigate();

    return (
        <main className="Highlight__main">
            <aside className="Highlight__book">
                <p className="Highlight__book__image"></p>
                <p className="Highlight__book__text">
                    <b>186</b> / 234
                </p>
                <button
                    className="Highlight__book__reading__btn"
                    onClick={() => {
                        navigate("/personalreading");
                    }}
                >
                    Continue reading
                </button>
            </aside>
            <article className="Highlight__list__article">
                <section className="Highlight__list__title">
                    <TitleList></TitleList>
                </section>
                <section className="Highlight__list__btn">
                    <div className="Highlight__list__btn__temp">
                        <button className="Highlight__list__btn1">
                            My Lables
                        </button>
                        {/* <button className='Highlight__list__btn2'>Other's Study Note</button> */}
                        {/* <button className='Highlight__export__btn'>Export</button */}
                    </div>
                </section>
                <section className="Highlight__list">
                    <HighlightList></HighlightList>
                </section>
            </article>
            <aside className="Highlight__export">
                <button
                    className="Highlight__export__btn"
                    onClick={() => {
                        navigate("/milkdown");
                    }}
                >
                    Editor
                </button>
            </aside>
        </main>
    );
}

export default Highlight;
