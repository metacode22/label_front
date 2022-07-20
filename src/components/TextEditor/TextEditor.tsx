import { FC, useEffect } from 'react';
import { ReactEditor, useEditor } from '@milkdown/react';
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';

// plug-in
import { nord } from '@milkdown/theme-nord';
import { commonmark } from '@milkdown/preset-commonmark';
import { history } from '@milkdown/plugin-history';
import { block } from '@milkdown/plugin-block';

export const TextEditor: FC<{ value: string }> = ({ value }) => {
    const { editor, loading, getInstance } = useEditor((root) => {
        const editor = Editor.make().config((ctx) => {
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
        
    })
    
    return <ReactEditor editor={editor}></ReactEditor>
}