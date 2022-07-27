/* Copyright 2021, Milkdown by Mirone. */

import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { prism } from '@milkdown/plugin-prism';
import { tooltip } from '@milkdown/plugin-tooltip';
import { ReactEditor, useEditor, useNodeCtx } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import { FC, ReactNode, useEffect } from 'react';
import { block, blockPlugin } from '@milkdown/plugin-block';
import { math } from '@milkdown/plugin-math';
import { menu } from '@milkdown/plugin-menu';
import { gfm } from '@milkdown/preset-gfm';
import { history } from '@milkdown/plugin-history'
import io from 'socket.io-client';
import React from 'react';
import './TextEditor.css';

const url: string = 'ws://13.125.242.9:3000';
let socket:any;

let timerId : NodeJS.Timeout
export class WrapperTextEditor extends React.Component<{},{ fp: string, flag: boolean }> {
    constructor(props: any) {
        socket = io(url, { 
            transports: ["websocket"],
            query: {
                "userId": "ddong",
                "pdfId": "pdf"
            }
        });
        
        console.log('--------', props);
        console.log('socket:', socket);
        
        console.log('construct')
        super(props);
        this.state = {fp: 'hello', flag: false};
        socket.on('connect',() => {
            console.log('connect-------------');
            socket.once('updateEditorOnce', (value: any) => {
                this.setState({
                    fp: value,
                    flag: true,
                })
            })
        })
    }

    render() {
        // console.log('value in render:', this.state.fp, this.state.flag)
        return (
            <div>
                {this.state.flag && <TextEditor value={this.state.fp}/>}
            </div>
        )
    };

    componentWillUnmount() {
        if (socket != null && socket.connected === true) {
            console.log('disconnect');
            socket.disconnect();
        }
    }
}

/* solution 2 */
function updateEditor(userID : string, pdfID : string, value : string) {
    timerId = setTimeout(() => {
        socket.emit("updateEditor", {id: userID, pdfId: pdfID, text: value}, clearTimeout(timerId));
    }, 700)
}

export const TextEditor: FC<{ value: string }> = ({ value }) => {
    const { editor, loading, getInstance } = useEditor((root, renderReact) => {
                const editor = Editor.make()
                    .config((ctx) => {
                        console.log('defaultValueCtx:', 'hey');
                        ctx.set(rootCtx, root);
                        ctx.set(defaultValueCtx, value);
                        ctx.get(listenerCtx).markdownUpdated((_, value) => {
                            const userID = 'ddong';
                            const pdfID = 'pdf';
                            console.log('input value:', value)
                            /* solution 2 */
                            if (timerId) {
                                clearTimeout(timerId);
                                updateEditor(userID, pdfID, value)
                                console.log('clear')
                            } else {
                                updateEditor(userID, pdfID, value)
                                console.log('update')
                            }
                            /* solution 1 */
                            // socket.emit("updateEditor", {id: userID, pdfId: pdfID, text: value});
                            return value;
                        });
                    })
                    .use(block.configure(blockPlugin, {
                        configBuilder: (ctx) => {
                            return [/* your actions */];
                        }
                    }))
                    .use(nord)
                    .use(history)
                    // .use(nodes)
                    // .use(commonmarkPlugins)
                    .use(gfm)
                    .use(math)
                    // .use(tooltip)
                    .use(prism)
                    .use(menu)
                    .use(listener)

                    return editor
        })
        useEffect(() => {
            document.querySelector('.ProseMirror.editor')?.setAttribute('ondrop', 'drop_handler(event)');
            document.querySelector('.ProseMirror.editor')?.setAttribute('ondragover', 'dragover_handler(event)');
            
            let height = document.querySelector('.PersonalReading__mainPage')?.clientHeight;
            if (height != null) {
                document.querySelector('.milkdown')?.setAttribute('style', `height: ${height - 180}px`);    
            }
        });
    
    return <ReactEditor editor={editor} />
};