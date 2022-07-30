import logo from './logo.svg';
import './App.css';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import jsPDF from 'jspdf';

function App() {
	const source = useRef();
	
	return (
		<>
			<div ref={source} className="source">how to make pdf from html source.</div>
			
			<button className="captureButton" onClick={() => {
				html2canvas(source.current).then((canvas) => {
					let doc = new jsPDF('p', 'mm', 'a4');
					
					let imgData = canvas.toDataURL('image/png');
					
					doc.addImage(imgData, 'PNG', 0, 0);
					
					doc.save('sample-fild.pdf');
				})
			}}>Capture Button</button>
		</>
	);
}

export default App;
