function dragover_handler(ev) {
    console.log("dragOver");
    ev.preventDefault();
}

function drop_handler(ev) {
    console.log("Drop");
    ev.preventDefault();
    // 놓기 대상의 ID 인 데이터를 가져옵니다.
    // var data = ev.dataTransfer.getData("text");
    // console.log('data', data);
    // console.log(data);
    // const temp1 = document.getElementsByClassName(data);

    const temp = document.createElement("div");
    // console.log('temp1:', temp1);
    temp.id = "temp";
    console.log(temp.id);
    // temp.innerHTML = temp1.innerHTML;
    console.log(temp);
    console.log(ev.target);
    // ev.target.appendChild(document.getElementById(data));
    ev.target.append("123");
    // ev.target.append(temp.innerHTML);
    // console.log(temp1.innerHTML);
    // console.log(document.getElementById(data).innerHTML);
    // 드래그 데이터 캐시를 지 웁니다 (모든 형식 / 유형에 대해)
    ev.dataTransfer.clearData();
}

function dragstart_handler(ev) {
    console.log("dragStart");
    // 소스 요소의 배경색을 변경하여 드래그가 시작되었음을 나타냅니다.
    // ev.currentTarget.style.border = "dashed";
    // 드래그 형식과 데이터를 설정합니다. 데이터에 이벤트 대상의 ID 사용
    ev.dataTransfer.setData("text/plain", ev.target.className);
    console.log(ev.target);
    console.log(ev.target.className);
}
