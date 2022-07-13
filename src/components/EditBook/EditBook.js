import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import * as Y from 'yjs'
// import { WebsocketProvider } from 'y-websocket'

// const doc = new Y.Doc()
// const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my-roomname', doc)

// wsProvider.on('status', event => {
//   console.log(event.status) // logs "connected" or "disconnected"
// })

class EditorComponent extends Component{
    constructor(props){
        super(props);
    }

    
    modules = {
        toolbar: [
          //[{ 'font': [] }],
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link'],
          [{ 'align': [] }, { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          ['clean']
        ],
      }
    
      formats = [
        //'font',
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'align', 'color', 'background',        
      ]

    render(){
        const { value, onChange } = this.props;
        return(
            <div style={{height: "650px"}}>
                <ReactQuill 
                    style={{height: "600px"}} 
                    theme="snow" 
                    modules={this.modules} 
                    formats={this.formats} 
                    value={value || ''} 
                    onChange={(content, delta, source, editor) => onChange(editor.getHTML())} />
            </div>
        )
    }
}
export default EditorComponent