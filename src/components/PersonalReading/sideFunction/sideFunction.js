import axios from 'axios';

// PDF Download
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Highlighting Logic
function clickHighlight( pdfIdx, currentPageNumber, highlightButtonsWrap, updateHighlightList, setUpdateHighlightList, color, event ) {
    event?.stopPropagation();
    const selectedText = window.getSelection().toString().trim();
    const selectedRange = window.getSelection().getRangeAt(0);

    // 같은 Text를 거꾸로 drag해도 selectedStartContainer와 selectedEndContainer는 동일하다.
    const selectedStartContainer = window.getSelection().getRangeAt(0).startContainer;
    const selectedEndContainer = window.getSelection().getRangeAt(0).endContainer;
    const parentElementOfSelectedStartContainer = selectedStartContainer.parentElement;
    const parentElementOfSelectedEndContainer = selectedEndContainer.parentElement;

    const offsetOfSelectedStartContainer = selectedRange.startOffset;
    let indexOfSelectedStartContainer = 0;
    for ( let i = 0; i < parentElementOfSelectedStartContainer.childNodes.length; i++ ) {
        if ( parentElementOfSelectedStartContainer.childNodes[i] === selectedStartContainer ) {
            indexOfSelectedStartContainer = i;
        }
    }

    // end는 마지막을 초과해서 포함하는 것 같다.
    const offsetOfSelectedEndContainer = selectedRange.endOffset;
    let indexOfSelectedEndContainer = 0;

    for ( let i = 0; i < parentElementOfSelectedEndContainer.childNodes.length; i++) {
        if ( parentElementOfSelectedEndContainer.childNodes[i] === selectedEndContainer ) {
            indexOfSelectedEndContainer = i;
        }
    }
    
    function recur(x, count) {
        if (x.classList.toString().includes("y") === true) {
            return x.classList;
        }

        return recur(x.parentElement, count + 1);
    }

    let yOfSelectedStartContainer = recur( parentElementOfSelectedStartContainer, 0 )[4];
    let yOfSelectedEndContainer = recur( parentElementOfSelectedEndContainer, 0 )[4];
    
    let highlightColorIndex;
    
    if (color === 'highlightedGreen') {
        highlightColorIndex = 0;
    }
    
    if (color === 'highlightedPurple') {
        highlightColorIndex = 1;
    }
    
    if (color === 'highlightedYellow') {
        highlightColorIndex = 2;
    }
    
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
        color: highlightColorIndex
    };

    axios.post("https://inkyuoh.shop/highlights", {
            pdfIdx: pdfIdx,
            pageNum: currentPageNumber,
            startLine: yOfSelectedStartContainer,
            startOffset: offsetOfSelectedStartContainer,
            startNode: indexOfSelectedStartContainer,
            endLine: yOfSelectedEndContainer,
            endOffset: offsetOfSelectedEndContainer,
            endNode: indexOfSelectedEndContainer,
            data: selectedText,
            color: highlightColorIndex,
        })
        .then((response) => {
            console.log("Highlight POST Success\nresponse:", response);
            setUpdateHighlightList(!updateHighlightList);
        })
        .catch((error) => {
            console.log("Highlight POST Fail\nerror:", error);
        })
        .then(() => {
            axios.get(`https://inkyuoh.shop/highlights/pdfs/${pdfIdx}/pages/${currentPageNumber}`)
                .then((response) => {
                    doHighlight(highlightData, response.data.result[response.data.result.length - 1].highlightIdx);
                })
        })

    highlightButtonsWrap.current.style.display = "none";
}

function doHighlight(highlightData, highlightIdx) {
    const yOfSelectedStartContainer = highlightData.startLine;
    const offsetOfSelectedStartContainer = highlightData.startOffset;
    const indexOfSelectedStartContainer = highlightData.startNode;

    const yOfSelectedEndContainer = highlightData.endLine;
    const offsetOfSelectedEndContainer = highlightData.endOffset;
    const indexOfSelectedEndContainer = highlightData.endNode;

    const decimalYOfSelectedStartContainer = parseInt( yOfSelectedStartContainer.slice(1), 16);
    const decimalYOfSelectedEndContainer = parseInt( yOfSelectedEndContainer.slice(1), 16);
    
    let highlightColor;
    
    if (highlightData.color === 0) {
        highlightColor = 'highlightedGreen';
    }
    
    if (highlightData.color === 1) {
        highlightColor = 'highlightedPurple';
    }
    
    if (highlightData.color === 2) {
        highlightColor = 'highlightedYellow';
    }
    
    // currentElement를 잘 잡지 못해서 에러가 난다.
    for ( let i = decimalYOfSelectedStartContainer; i <= decimalYOfSelectedEndContainer; i++) {
        const currentElement = document.getElementsByClassName( `y${i.toString(16)}`)[0];
        const newRange = document.createRange();

        const newNode = document.createElement("span");
        
        // delete 시 곧바로 삭제할 수 있도록 미리 class를 더해놓음.
        // 나중에 지울 때 class를 통해 곧바로 노드를 찾아서 highlighted 클래스를 제거하면 됨.
        
        newNode.classList.add(highlightColor);
        newNode.classList.add('highlight' + highlightIdx);
        if ( decimalYOfSelectedStartContainer === decimalYOfSelectedEndContainer) {
            newRange.setStart( currentElement?.childNodes[indexOfSelectedStartContainer], offsetOfSelectedStartContainer);
            newRange.setEnd( currentElement?.childNodes[indexOfSelectedEndContainer], offsetOfSelectedEndContainer);

            drawHighlight(newRange, newNode);
            return;
        }

        if (i === decimalYOfSelectedStartContainer) {
            newRange.setStart( currentElement?.childNodes[indexOfSelectedStartContainer], offsetOfSelectedStartContainer);
            newRange.setEnd( currentElement?.childNodes[currentElement.childNodes.length - 1], currentElement.childNodes[currentElement.childNodes.length - 1].length);
        } else if (i === decimalYOfSelectedEndContainer) {
            newRange.setStart(currentElement?.childNodes[0], 0);
            newRange.setEnd( currentElement?.childNodes[indexOfSelectedEndContainer], offsetOfSelectedEndContainer);
        } else {
            newRange.setStart(currentElement?.childNodes[0], 0);
            newRange.setEnd( currentElement?.childNodes[currentElement.childNodes.length - 1], currentElement.childNodes[currentElement.childNodes.length - 1].length);
        }

        drawHighlight(newRange, newNode);
    }
}

function drawHighlight(range, node) {
    node.appendChild(range.extractContents());
    range.insertNode(node);
}

// Turn over functions
function turnOver(direction, currentPageNumber, setCurrentPageNumber, totalPage) {
    if (direction === 'back') {
        if (currentPageNumber === 1) {
            return;
        }
        
        setCurrentPageNumber((currentPageNumber) => currentPageNumber - 1);
    }
    
    if (direction === 'go') {
        if(currentPageNumber === totalPage) {
            return;
        }
        
        setCurrentPageNumber((currentPageNumber) => currentPageNumber + 1);
    }
}

// html to pdf V.1
function toPdf(pdfName) {
    document.querySelector('.editor')?.setAttribute('style', 'overflow: visible !important');
    document.querySelector('.editor')?.setAttribute('style', 'height: auto !important');
    
    html2canvas(document.querySelector('.editor')).then((canvas) => {
        var imgData = canvas.toDataURL('image/png');

        var imgWidth = 180; 
        var pageHeight = imgWidth * 1.414;  
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        var margin = 20;

        var doc = new jsPDF('p', 'mm', 'a4');
        var position = 0;

        doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        doc.save(`${pdfName}.pdf`);
    })
    
    document.querySelector('.editor')?.setAttribute('style', 'overflow: scroll !important');
    document.querySelector('.editor')?.setAttribute('style', 'height: 100% !important');
}

// html to pdf V.2
// function toPdf(pdfName) {
//     document.querySelector('.editor')?.setAttribute('style', 'overflow: visible !important');
//     document.querySelector('.editor')?.setAttribute('style', 'height: auto !important');
//     // document.querySelectorAll('.editor > *').forEach((element) => {
//     //     element.setAttribute('style', 'margin: 12px;');
//     // })
    
//     // A4 => 297mm x 210mm
//     let renderedImg = new Array();
//     let contentWidth = 180;
//     let padding = 15;
    
//     createPdf();
    
//     function generateCanvas(i, doc, deferred, currentList) {
//         let pdfWidth = $(currentList).outerWidth() * 0.2645;
//         let pdfHeight = $(currentList).outerHeight() * 0.2645;
//         let heightCalculate = contentWidth * pdfHeight / pdfWidth;
        
//         html2canvas(currentList).then(
//             function (canvas) {
//                 let img = canvas.toDataURL('image/jpeg', 1.0);
//                 renderedImg.push({num: i, image: img, height: heightCalculate});
//                 deferred.resolve();
//             }
//         )
//     }
    
//     function createPdf() {
//         let lists = document.querySelectorAll('.editor > *');
//         console.log(lists);
//         let deferreds = [];
//         let doc = new jsPDF('p', 'mm', 'a4');
        
//         for (let i = 0; i < lists.length; i++) {
//             let deferred = $.Deferred();
//             deferreds.push(deferred.promise());
//             generateCanvas(i, doc, deferred, lists[i]);
//         }
        
//         $.when.apply($, deferreds).then(function () {
//             let sorted = renderedImg.sort(function(a, b) {
//                 return a.num < b.num ? -1 : 1;
//             })
//             let currentHeight = padding;
            
//             for (let i = 0; i < sorted.length; i++) {
//                 let sortedHeight = sorted[i].height;
//                 let sortedImage = sorted[i].image;
                
//                 if ( currentHeight + sortedHeight > 297 - padding * 2) {
//                     doc.addPage();
//                     currentHeight = padding;
//                     doc.addImage(sortedImage, 'jpeg', padding, currentHeight, contentWidth, sortedHeight);
//                     currentHeight += sortedHeight;
//                 } else {
//                     doc.addImage(sortedImage, 'jpeg', padding, currentHeight, contentWidth, sortedHeight);
//                     currentHeight += sortedHeight;
//                 }
//             }
            
//             doc.save(`${pdfName}.pdf`);
            
//             currentHeight = padding;
//             renderedImg = new Array();
//         })
//     }
    
//     document.querySelector('.editor')?.setAttribute('style', 'overflow: scroll !important');
//     document.querySelector('.editor')?.setAttribute('style', 'height: 100% !important');
// }

export { clickHighlight, doHighlight, turnOver, toPdf };