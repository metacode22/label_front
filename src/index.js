import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

function dragover_handler(ev) {
    console.log("dragOver");
    ev.preventDefault();
   }
   
   function drop_handler(ev) {
    console.log("Drop");
    ev.preventDefault();
    // 놓기 대상의 ID 인 데이터를 가져옵니다.
    var data = ev.dataTransfer.getData("text");
    console.log('ev', ev);
    ev.target.appendChild(document.getElementById(data));
    // 드래그 데이터 캐시를 지 웁니다 (모든 형식 / 유형에 대해)
    ev.dataTransfer.clearData();
   }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
        <CookiesProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </CookiesProvider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();