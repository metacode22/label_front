import { FC, useEffect, useState } from 'react';
import { EditorInfo, ReactEditor, useEditor } from '@milkdown/react';
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';

// plug-in
import { nord } from '@milkdown/theme-nord';
import { commonmark } from '@milkdown/preset-commonmark';
import { history } from '@milkdown/plugin-history';
import { block } from '@milkdown/plugin-block';
import axios from 'axios';

export const HighlightCollection: React.FC<{ value: string }> = ({ value }) => {
    
    let { editor, loading, getInstance } = useEditor((root) => {
        let editor = Editor.make().config((ctx) => {
            ctx.set(rootCtx, root);
            ctx.set(defaultValueCtx, value);
        })
        .use(nord)
        .use(commonmark)
        .use(history)
        .use(block)
        
        return editor;
    })
    
    useEffect(() => {
        
    }, [editor, loading, getInstance])
    
    return <ReactEditor editor={editor}></ReactEditor>
}