function Practice () {
    // function dragstart_handler(ev) {
    //     console.log("dragStart");
    //     // 소스 요소의 배경색을 변경하여 드래그가 시작되었음을 나타냅니다.
    //     // ev.currentTarget.style.border = "dashed";
    //     // 드래그 형식과 데이터를 설정합니다. 데이터에 이벤트 대상의 ID 사용
    //     ev.dataTransfer.setData("text/plain", ev.target.class);
    //     console.log(ev.dataTransfer);
    //    }

    return (<div>
        <h1 style={{ textAlign: 'center'}} onDragStart={(event) => {dragstart_handler(event)}} draggable='true'>hello</h1>
        <h1 style={{ textAlign: 'center'}} onDragStart={(event) => {dragstart_handler(event)}} draggable='true'>hello</h1>
        </div>
    )
}

export default Practice;