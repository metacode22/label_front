import axios from 'axios'
import React, { useState } from 'react'
import HTMLRenderer from 'react-html-renderer'


function App() {
  let [html,setHtml] = useState('');

axios({
  method: "GET",
  url: "http://localhost:4000/pdfs-Html",
  responseType: "type"
}).then(function (response) {
  console.log("hi");
  setHtml(response.data.result.pdfHtml);
});
  return (
    <div className="App">
      <HTMLRenderer
        html={html}
        components={{
        
        }}
      />
    </div>
  );
}


export default App;