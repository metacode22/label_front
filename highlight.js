const selectableTextArea = document.querySelectorAll(".selectable-text-area");
const twitterShareBtn = document.querySelector("#twitter-share-btn");
const collect_highlights_body = document.getElementById("add_highlighted_text");
// const collect_highlights_body = document.querySelector("#add_highlighted_text");
// console.log(collect_highlights_body)


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


selectableTextArea.forEach(elem => {
  elem.addEventListener("mouseup", selectableTextAreaMouseUp);
});

twitterShareBtn.addEventListener("click", twitterShareBtnClick);

document.addEventListener("mousedown", documentMouseDown);

function selectableTextAreaMouseUp(event) {
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

function documentMouseDown(event) {
  if(event.target.id!=="twitter-share-btn" && getComputedStyle(twitterShareBtn).display==="block") {
    twitterShareBtn.style.display = "none";
    twitterShareBtn.classList.remove("btnEntrance");
    window.getSelection().empty();
  }
}

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


