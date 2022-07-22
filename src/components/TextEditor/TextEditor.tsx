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
import { collaborative, CollabService, collabServiceCtx } from '@milkdown/plugin-collaborative';

import { WebsocketProvider } from 'y-websocket';
import { Doc } from 'yjs';

// const options = [
//     { color: '#5e81AC', name: 'milkdown user 1' },
//     { color: '#8FBCBB', name: 'milkdown user 2' },
//     { color: '#dbfdbf', name: 'milkdown user 3' },
//     { color: '#D08770', name: 'milkdown user 4' },
// ];
// const rndInt = Math.floor(Math.random() * 4);

// const status$ = document.getElementById('status');
// const connect$ = document.getElementById('connect');
// const disconnect$ = document.getElementById('disconnect');

// const apply$ = document.getElementById('apply');
// const template$ = document.getElementById('template');

// const room$ = document.getElementById('room');
// const toggle$ = document.getElementById('toggle');

// const autoConnect = true;
// class CollabManager {
//     private room = '안뇽';
//     private doc!: Doc;
//     private wsProvider!: WebsocketProvider;

//     constructor(private collabService: CollabService) {
//         if (room$) {
//             room$.textContent = this.room;
//         }
//     }

//     flush(template: string) {
//         // this.doc?.destroy();
//         this.wsProvider?.destroy();

//         this.doc = new Doc();
//         this.wsProvider = new WebsocketProvider('ws://43.200.178.193:3000', 'jungle', this.doc, { connect: autoConnect });
//         this.wsProvider.awareness.setLocalStateField('user', options[rndInt]);
//         this.wsProvider.awareness.setLocalStateField('room', 'jungle');
//         this.wsProvider.on('status', (payload: { status: string }) => {
//             if (status$) {
//                 status$.innerText = payload.status;
//             }
//         });

//         this.collabService.bindDoc(this.doc).setAwareness(this.wsProvider.awareness);
//         this.wsProvider.once('synced', async (isSynced: boolean) => {
//             if (isSynced) {
//                 this.collabService.applyTemplate(template).connect();
//             }
//         });
//     }

//     connect() {
//         this.wsProvider.connect();
//         this.collabService.connect();
//     }

//     disconnect() {
//         this.collabService.disconnect();
//         this.wsProvider.disconnect();
//     }

//     applyTemplate(template: string) {
//         this.collabService
//             .disconnect()
//             .applyTemplate(template, () => true)
//             .connect();
//     }

//     toggleRoom() {
//         this.room = this.room === 'milkdown' ? 'sandbox' : 'milkdown';
//         if (room$) {
//             room$.textContent = this.room;
//         }

//         const template = this.room === 'milkdown' ? 'hello' : '# Sandbox Room';
//         this.disconnect();
//         this.flush(template);
//     }
// }

export const TextEditor: React.FC<{ value: string}> = ({ value }) => {
    let [markdown, setMarkdown] = useState('');
    
    useEffect(() => {
        async function getMarkdown() {
            await axios.get(`http://3.35.27.172:3000/highlights/pdfs/${1}/pages/${7}`)
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
        // .use(collaborative);
        
        return editor;
    }, [markdown]) 
    
    // useEffect(() => {
    //     if (!loading) {
    //         const instance = getInstance();
    //         instance?.action((ctx) => {
    //             const collabService = ctx.get(collabServiceCtx);
    //             const collabManager = new CollabManager(collabService);
    //             collabManager.flush(markdown);
    //             console.log('hi');
    //             if (connect$) {
    //                 connect$.onclick = () => {
    //                     collabManager.connect();
    //                 };
    //             }
        
    //             if (disconnect$) {
    //                 disconnect$.onclick = () => {
    //                     collabManager.disconnect();
    //                 };
    //             }
        
    //             if (apply$ && template$) {
    //                 apply$.onclick = () => {
    //                     if (template$ instanceof HTMLTextAreaElement) {
    //                         collabManager.applyTemplate(template$.value);
    //                     }
    //                 };
    //             }
        
    //             if (toggle$) {
    //                 toggle$.onclick = () => {
    //                     collabManager.toggleRoom();
    //                 };
    //             }
    //             // do something
    //         });
    //     }
    // }, [getInstance, loading]);
    
    return <ReactEditor editor={editor}></ReactEditor>
}
