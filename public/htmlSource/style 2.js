const selectableTextArea = document.querySelectorAll(".selectable-text-area");
const twitterShareBtn = document.querySelector("#twitter-share-btn");
const collect_highlights_body = document.getElementById("add_highlighted_text");
// const collect_highlights_body = document.querySelector("#add_highlighted_text");
console.log("selectableTextArea : ", selectableTextArea);

// localStorage 목록들 각각에게 paintData 함수 실행.
if (collect_highlights_body !== null) {
  console.log(collect_highlights_body);
  const savedToDos = localStorage.getItem("data*")
  const parsedToDos = JSON.parse(savedToDos);
  console.log(parsedToDos);
  const dataAll = Object.values(localStorage);
  console.log(dataAll);


  // dataAll.forEach((text) => console.log("this is the turn of ", text));
  // toDos = parsedToDos;
  // parsedToDos.forEach((item) => paintToDo(item));
  dataAll.forEach((paintData));
}

// 형광펜 칠하기.
function paintData(value){
  
  const values = JSON.parse(value);
  // console.log(Object.values(value));
  const data = values.text
  console.log(data)

  const li = document.createElement("li");
  const span = document.createElement("span");
  li.appendChild(span);
  span.innerText = data;
  collect_highlights_body.appendChild(li);
}

// selectableTextArea 영역의 태그들에게 다음 함수 이벤트를 더한다.
selectableTextArea.forEach(elem => {
  elem.addEventListener("mouseup", selectableTextAreaMouseUp);
});

// 드래그 후 나오는 버튼 클릭 시 다음 함수가 실행되게 설정.
twitterShareBtn.addEventListener("click", twitterShareBtnClick);

// document 클릭 시 다음 함수가 실행되게 설정.
document.addEventListener("mousedown", documentMouseDown);

// mouseup하면 다음 함수가 실행된다.
function selectableTextAreaMouseUp(event) {
  console.log("event :", event);
  setTimeout(() => { // In order to avoid some weird behavior...
    const selectedText = window.getSelection().toString().trim();
    if(selectedText.length) { 
      const x = event.pageX;
      const y = event.pageY;
      const twitterShareBtnWidth = Number(getComputedStyle(twitterShareBtn).width.slice(0,-2));
      const twitterShareBtnHeight = Number(getComputedStyle(twitterShareBtn).height.slice(0,-2));

      if(document.activeElement !== twitterShareBtn) {
        twitterShareBtn.style.left = `${x - twitterShareBtnWidth*0.5}px`;
        twitterShareBtn.style.top = `${y - twitterShareBtnHeight*1.25}px`;
        twitterShareBtn.style.display = "block";
        twitterShareBtn.classList.add("btnEntrance");
      }
      else {
        twitterShareBtn.style.left = `${x-twitterShareBtnWidth*0.5}px`;
        twitterShareBtn.style.top = `${y-twitterShareBtnHeight*0.5}px`;
      }
    }    
  }, 0);
}

// document 부분에서 mousedown하면 버튼이 사라지도록 하는 함수이다.
function documentMouseDown(event) {
  if(event.target.id!=="twitter-share-btn" && getComputedStyle(twitterShareBtn).display==="block") {
    twitterShareBtn.style.display = "none";
    twitterShareBtn.classList.remove("btnEntrance");
    window.getSelection().empty();
  }
}

// mouseup후 뜨는 버튼을 누르면 다음 과정이 수행되도록 한다.
function twitterShareBtnClick(event) {
  console.log(event);
  const selectedText = window.getSelection().toString().trim();
  
  const range = window.getSelection().getRangeAt(0);
  const span = document.createElement('span');
  const li = document.createElement('li');
  span.className = 'highlight';
  span.appendChild(range.extractContents());
  range.insertNode(span);
  // li.appendChild(span);
  li.innerText = selectedText;
  dataSubmit(selectedText)
  console.log(li);
  // collect_highlights_body.appendChild(li)
}

let idx = 0;
function saveData(newDataObj){
  idx += 1;
  localStorage.setItem(`data${idx}`, JSON.stringify(newDataObj));
}


function dataSubmit(selectedText){
  // event.preventDefault();
  const data = selectedText
  const newDataObj = {
    text: data, 
    id: Date.now(), 
  }
  // toDos.push(newTodoObj);
  saveData(newDataObj);
}

// paintToDo(newTodoObj.text);


