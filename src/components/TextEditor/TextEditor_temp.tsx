import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';

import { ReactEditor, useEditor } from '@milkdown/react';
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';

// plug-in
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { nord } from '@milkdown/theme-nord';
import { block} from '@milkdown/plugin-block';
import { tooltip } from '@milkdown/plugin-tooltip';
import { history } from '@milkdown/plugin-history';
import { commonmark } from '@milkdown/preset-commonmark';
import { menu } from '@milkdown/plugin-menu';

export const TextEditor: React.FC<{ value: string}> = ({ value }) => {
    let [markdown, setMarkdown] = useState('');
    
    useEffect(() => {
        async function getMarkdown() {
            await axios.get(`https://inkyuoh.shop/highlights/pdfs/${1}/pages/${7}`)
            .then((response) => {
                let markdown = '';
                
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
        .use(tooltip)
        .use(history)
        .use(commonmark)
        .use(block)
        .use(menu)
        .use(listener)
        
        return editor;
    }, [markdown]) 
    
    return <ReactEditor editor={editor}></ReactEditor>
}
