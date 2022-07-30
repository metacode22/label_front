// import { FC, useEffect, useState } from 'react';
// import { EditorInfo, ReactEditor, useEditor } from '@milkdown/react';
// import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';

// // plug-in
// import { nord } from '@milkdown/theme-nord';
// import { commonmark } from '@milkdown/preset-commonmark';
// import { history } from '@milkdown/plugin-history';
// import { block } from '@milkdown/plugin-block';
// import axios from 'axios';

// export const HighlightCollection: React.FC<{ value: string }> = ({ value }) => {
//     const [page, setPage] = useState('');
    
//     useEffect(() => {
//         async function getPage() {
//             await axios.get(`https://inkyuoh.shop/highlights/pdfs/${1}/pages/${7}`)
//             .then((response) => {
//                 let markdown = '';
                
//                 for (let i = 0; i < response.data.result.length; i++) {
//                     markdown += response.data.result[i].data;
//                 }
                
//                 setPage(markdown);
                
//                 console.log('markdown', markdown);
//             })
//         }
        
//         console.log('useEffect');
//         getPage();
        
//     }, []);
        
//     let { editor, loading, getInstance } = useEditor((root) => {
//         let editor = Editor.make().config((ctx) => {
//             ctx.set(rootCtx, root);
//             ctx.set(defaultValueCtx, page);
//         })
//         .use(nord)
//         .use(commonmark)
//         .use(history)
//         .use(block)
        
//         return editor;
//     }, [page])
    
//     return <ReactEditor editor={editor}></ReactEditor>
// }