import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';

import { ReactEditor, useEditor } from '@milkdown/react';
import { defaultValueCtx, Editor, rootCtx, editorViewOptionsCtx } from '@milkdown/core';

// plug-in
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { nord } from '@milkdown/theme-nord';
import { block} from '@milkdown/plugin-block';
import { tooltip } from '@milkdown/plugin-tooltip';
import { history } from '@milkdown/plugin-history';
import { commonmark } from '@milkdown/preset-commonmark';
import { menu } from '@milkdown/plugin-menu';
import './HighlightCollection.css';

export const HighlightCollection: React.FC<{ value: string}> = ({ value }) => {
    let [markdown, setMarkdown] = useState('');
    
    useEffect(() => {
        async function getMarkdown() {
            await axios.get(`http://43.200.26.215:3000/highlights/pdfs/${1}/pages/${7}`)
            .then((response) => {
                let markdown = '';
                markdown = '<하이라이트 목록들>';
                for (let i = 0; i < response.data.result.length; i++) {
                    markdown += '- ';
                    markdown += response.data.result[i].data;
                    markdown += '\n';
                }
                
                setMarkdown(markdown);
            })
        }
        
        getMarkdown();
    }, []);
    
    // function dragover_handler(ev:any) {
    //     console.log("dragOver");
    //     ev.preventDefault();
    //    }
       
    //    function drop_handler(ev:any) {
    //     console.log("Drop");
    //     ev.preventDefault();
    //     // 놓기 대상의 ID 인 데이터를 가져옵니다.
    //     var data = ev.dataTransfer.getData("text");
    //     ev.target.appendChild(document.getElementById(data));
    //     // 드래그 데이터 캐시를 지 웁니다 (모든 형식 / 유형에 대해)
    //     ev.dataTransfer.clearData();
    //    }
    
    useEffect(() => {
        document.querySelectorAll('.ProseMirror.editor')[1]?.setAttribute('contenteditable', 'false');
        document.querySelectorAll('.ProseMirror.editor')[1]?.setAttribute('ondrop', 'drop_handler(event)');
        document.querySelectorAll('.ProseMirror.editor')[1]?.setAttribute('ondragover', 'dragover_handler(event)');
    });
    
    // [], dependency 에 아무것도 안 넣어서 useEditor가 다시 실행되지 않았었다.
    let { editor, loading, getInstance } = useEditor((root, renderReact) => {
        let editor = Editor.make().config((ctx) => {
            ctx.set(rootCtx, root);
            ctx.set(defaultValueCtx, markdown);
            ctx.get(listenerCtx).markdownUpdated((ctx, markdown, previousMarkdown) => {
                return markdown;
            })
        })
        .use(nord)
        .use(commonmark)
        .use(block)
        .use(listener)
        
        return editor;
    }, [markdown]) 
    
    return <ReactEditor editor={editor}></ReactEditor>
}
