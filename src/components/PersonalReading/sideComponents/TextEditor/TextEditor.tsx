import { editorViewOptionsCtx } from '@milkdown/core';
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { prism } from '@milkdown/plugin-prism';
import { tooltip } from '@milkdown/plugin-tooltip';
import { ReactEditor, useEditor, useNodeCtx } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import { FC, ReactNode, useEffect } from 'react';
import { block, blockPlugin } from '@milkdown/plugin-block';
import { math } from '@milkdown/plugin-math';
import { menu, menuPlugin } from '@milkdown/plugin-menu';
import { gfm } from '@milkdown/preset-gfm';
import { history } from '@milkdown/plugin-history'
import io from 'socket.io-client';
import React from 'react';
import './TextEditor.css';

const url:string = 'https://tradingstudy.shop:443';
let socket:any;

let timerId:NodeJS.Timeout
export class WrapperTextEditor extends React.Component<{markdownValue: string, commitIdx: number, userIdx: string, pdfIdx: string}, { fp: string, flag: boolean }> {
    constructor(props: any) {
        super(props);
        socket = io(url, {
            transports: ["websocket"],
            query: {
                "userId": String(this.props.userIdx),
                "pdfId": String(this.props.pdfIdx)
            },
        });
        
        this.state = {fp: 'hello', flag: false};
        socket.on('connect',() => {
            // console.log('connect-------------');
            socket.once('updateEditorOnce', (value: any) => {
                this.setState({
                    fp: value,
                    flag: true,
                })
            })
        })
        
        if (this.props.commitIdx !== -1) {
            socket.disconnect();
        }
    }


    render() {
        // console.log('value in render:', this.state.fp, this.state.flag)
        return (
            <div>
                {this.state.flag && <TextEditor value={this.state.fp} markdownValue={this.props.markdownValue} commitIdx={this.props.commitIdx} userIdx={this.props.userIdx} pdfIdx={this.props.pdfIdx}/>}
            </div>
        )
    };

    componentWillUnmount() {
        if (socket != null && socket.connected === true) {
            // console.log('disconnect');
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

export const TextEditor: FC<{ value: string, markdownValue: string, commitIdx: number, userIdx: string, pdfIdx: string }> = ({ value, markdownValue, commitIdx, userIdx, pdfIdx }) => {
    // let readonly = false;
    // const editable = () => !readonly;
    const { editor, loading, getInstance } = useEditor((root, renderReact) => {
                const editor = Editor.make()
                    .config((ctx) => {
                        ctx.set(rootCtx, root);
                        // ctx.set(editorViewOptionsCtx, { editable })
                        
                        if (commitIdx === -1) {
                            ctx.set(defaultValueCtx, value);    
                        } else {
                            // console.log('-----------------', markdownValue);
                            ctx.set(defaultValueCtx, markdownValue);  
                        }
                        
                        ctx.get(listenerCtx).markdownUpdated((_, value) => {
                            const userID = userIdx;
                            const pdfID = pdfIdx;
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
                    .use(block)
                    .use(menu)
                    .use(nord)
                    .use(history)
                    .use(gfm)
                    .use(math)
                    .use(prism)
                    .use(listener)

                    return editor
        }, [commitIdx, markdownValue])
           
    useEffect(() => {
        document.querySelector('.ProseMirror.editor')?.setAttribute('ondrop', 'drop_handler(event)');
        document.querySelector('.ProseMirror.editor')?.setAttribute('ondragover', 'dragover_handler(event)');
        
        let height = document.querySelector('.PersonalReading__mainPage')?.clientHeight;
        if (height != null) {
            document.querySelector('.milkdown')?.setAttribute('style', `height: ${height - 240}px`);    
        }
        
        if (commitIdx !== -1) {
            document.querySelector('.ProseMirror.editor')?.setAttribute('contenteditable', 'false');
        }
        
        // document.querySelector('.editor')?.setAttribute('style', 'overflow: scroll !important');
    });
    
    return <ReactEditor editor={editor} />
};