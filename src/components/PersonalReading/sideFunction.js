function drawHighlight(range, node) {
    node.appendChild(range.extractContents());
    range.insertNode(node);
}

function doHighlight(highlightData) {
    const yOfSelectedStartContainer = highlightData.startLine;
    const offsetOfSelectedStartContainer = highlightData.startOffset;
    const indexOfSelectedStartContainer = highlightData.startNode;

    const yOfSelectedEndContainer = highlightData.endLine;
    const offsetOfSelectedEndContainer = highlightData.endOffset;
    const indexOfSelectedEndContainer = highlightData.endNode;

    const decimalYOfSelectedStartContainer = parseInt(yOfSelectedStartContainer.slice(1), 16);
    const decimalYOfSelectedEndContainer = parseInt(yOfSelectedEndContainer.slice(1), 16);

    // currentElement를 잘 잡지 못해서 에러가 난다.
    // 태그 안에 또 다른 태그, 예를 들면 이탤릭 태그나 a 태그가 많다.
    for (let i = decimalYOfSelectedStartContainer; i <= decimalYOfSelectedEndContainer; i++) {
        const currentElement = document.getElementsByClassName(`y${i.toString(16)}`)[0];
        const newRange = document.createRange();

        const newNode = document.createElement("span");
        newNode.classList.add("highlighted");
        if (decimalYOfSelectedStartContainer === decimalYOfSelectedEndContainer) {
            newRange.setStart(currentElement.childNodes[indexOfSelectedStartContainer], offsetOfSelectedStartContainer);
            newRange.setEnd(currentElement.childNodes[indexOfSelectedEndContainer], offsetOfSelectedEndContainer);

            drawHighlight(newRange, newNode);
            return;
        }

        if (i === decimalYOfSelectedStartContainer) {
            newRange.setStart(currentElement.childNodes[indexOfSelectedStartContainer], offsetOfSelectedStartContainer);
            newRange.setEnd(currentElement.childNodes[currentElement.childNodes.length - 1], currentElement.childNodes[currentElement.childNodes.length - 1].length);
        } else if (i === decimalYOfSelectedEndContainer) {
            newRange.setStart(currentElement.childNodes[0], 0);
            newRange.setEnd(currentElement.childNodes[indexOfSelectedEndContainer], offsetOfSelectedEndContainer);
        } else {
            newRange.setStart(currentElement.childNodes[0], 0);
            newRange.setEnd(currentElement.childNodes[currentElement.childNodes.length - 1], currentElement.childNodes[currentElement.childNodes.length - 1].length);
        }

        drawHighlight(newRange, newNode);
    }
}

function clickHighlight(pdfIdx, currentPageNumber, highlightButton, resetCount, setResetCount) {
    const selectedText = window.getSelection().toString().trim();
    const selectedRange = window.getSelection().getRangeAt(0);

    // 같은 Text를 거꾸로 drag해도 selectedStartContainer와 selectedEndContainer는 동일하다.
    const selectedStartContainer = window.getSelection().getRangeAt(0).startContainer;
    const selectedEndContainer = window.getSelection().getRangeAt(0).endContainer;
    const parentElementOfSelectedStartContainer = selectedStartContainer.parentElement;
    const parentElementOfSelectedEndContainer = selectedEndContainer.parentElement;

    const offsetOfSelectedStartContainer = selectedRange.startOffset;
    let indexOfSelectedStartContainer = 0;
    for (let i = 0;i < selectedStartContainer.parentElement.childNodes.length;i++) {
        if (selectedStartContainer.parentElement.childNodes[i] ===selectedStartContainer) {
            indexOfSelectedStartContainer = i;
        }
    }

    // end는 마지막을 초과해서 포함하는 것 같다.
    const offsetOfSelectedEndContainer = selectedRange.endOffset;
    let indexOfSelectedEndContainer = 0;

    for ( let i = 0; i < selectedEndContainer.parentElement.childNodes.length; i++) {
        if ( selectedEndContainer.parentElement.childNodes[i] === selectedEndContainer) { 
            indexOfSelectedEndContainer = i;
        }
    }

    function recur(x, count) {
        if (x.classList.toString().includes("y") === true) {
            return x.classList;
        }

        return recur(x.parentElement, count + 1);
    }

    let yOfSelectedStartContainer = recur(parentElementOfSelectedStartContainer, 0)[4];
    let yOfSelectedEndContainer = recur(parentElementOfSelectedEndContainer, 0)[4];

    const highlightData = {
        pdfIdx: pdfIdx,
        pageNum: currentPageNumber,
        startLine: yOfSelectedStartContainer,
        startOffset: offsetOfSelectedStartContainer,
        startNode: indexOfSelectedStartContainer,
        endLine: yOfSelectedEndContainer,
        endOffset: offsetOfSelectedEndContainer,
        endNode: indexOfSelectedEndContainer,
        data: selectedText,
    };

    doHighlight(highlightData);

    axios
        .post("http://43.200.26.215:3000/highlights", {
            pdfIdx: pdfIdx,
            pageNum: currentPageNumber,
            startLine: yOfSelectedStartContainer,
            startOffset: offsetOfSelectedStartContainer,
            startNode: indexOfSelectedStartContainer,
            endLine: yOfSelectedEndContainer,
            endOffset: offsetOfSelectedEndContainer,
            endNode: indexOfSelectedEndContainer,
            data: selectedText,
        })
        .then((response) => {
            console.log("Highlight POST Success\nresponse:", response);
            setResetCount((resetCount) => {
                return resetCount + 1;
            });
        })
        .catch((error) => {
            console.log("Highlight POST Fail\nerror:", error);
        });

    highlightButton.current.style.display = "none";
}

export { drawHighlight, doHighlight, clickHighlight};