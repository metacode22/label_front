/* Copyright 2021, Milkdown by Mirone. */

import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { prism } from '@milkdown/plugin-prism';
import { tooltip } from '@milkdown/plugin-tooltip';
import { codeFence as cmCodeFence, commonmark, image, link } from '@milkdown/preset-commonmark';
import { Node } from '@milkdown/prose/model';
import { ReactEditor, useEditor, useNodeCtx } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import { FC, ReactNode, useEffect, useState } from 'react';

import { CodeFence } from './CodeFence';
import { codeFence } from './CodeFence/codeFence.node';
// import { Image } from './Image';
import { block, blockPlugin } from '@milkdown/plugin-block';
import React from 'react';

import { collaborative, CollabService, collabServiceCtx } from '@milkdown/plugin-collaborative';
import { math } from '@milkdown/plugin-math';
import { gfm } from '@milkdown/preset-gfm';
// import { nord } from '@milkdown/theme-nord';
import { WebsocketProvider } from 'y-websocket';
import { Doc } from 'yjs';
// import './CoEditorMilk.css'

import axios from 'axios';

const markdown = `
# Milkdown Collaborative Example
---
Now you can play!
`;

const options = [
    { color: '#5e81AC', name: '2or0' },
    { color: '#8FBCBB', name: 'milkdown user 2' },
    { color: '#dbfdbf', name: 'milkdown user 3' },
    { color: '#D08770', name: 'milkdown user 4' },
];
const rndInt = Math.floor(Math.random() * 4);

const status$ = document.getElementById('status');
const connect$ = document.getElementById('connect');
const disconnect$ = document.getElementById('disconnect');

const apply$ = document.getElementById('apply');
const template$ = document.getElementById('template');

const room$ = document.getElementById('room');
const toggle$ = document.getElementById('toggle');

const autoConnect = true;
class CollabManager {
<<<<<<< HEAD
    private room = '안뇽';
=======
    private room = '정글b반';
>>>>>>> e233396002fac7a57e9518d4f60e60113d9b65b7
    private doc!: Doc;
    private wsProvider!: WebsocketProvider;

    constructor(private collabService: CollabService) {
        if (room$) {
            room$.textContent = this.room;
        }
    }

    flush(template: string) {
        // this.doc?.destroy();
        this.wsProvider?.destroy();

        this.doc = new Doc();
        this.wsProvider = new WebsocketProvider('ws://3.34.137.168:3000', '안뇽', this.doc, { connect: autoConnect });
        this.wsProvider.awareness.setLocalStateField('user', options[rndInt]);
        this.wsProvider.awareness.setLocalStateField('room', '안뇽');
        this.wsProvider.on('status', (payload: { status: string }) => {
            if (status$) {
                status$.innerText = payload.status;
            }
        });

        this.collabService.bindDoc(this.doc).setAwareness(this.wsProvider.awareness);
        this.wsProvider.once('synced', async (isSynced: boolean) => {
            if (isSynced) {
                this.collabService.applyTemplate(template).connect();
            }
        });
    }

    connect() {
        this.wsProvider.connect();
        this.collabService.connect();
    }

    disconnect() {
        this.collabService.disconnect();
        this.wsProvider.disconnect();
    }

    applyTemplate(template: string) {
        this.collabService
            .disconnect()
            .applyTemplate(template, () => true)
            .connect();
    }

    toggleRoom() {
        this.room = this.room === 'milkdown' ? 'sandbox' : 'milkdown';
        if (room$) {
            room$.textContent = this.room;
        }

        const template = this.room === 'milkdown' ? markdown : '# Sandbox Room';
        this.disconnect();
        this.flush(template);
    }
}
const Link: FC<{ children: ReactNode }> = ({ children }) => {
    const { node } = useNodeCtx();
    return (
        <a className="my-title" href={node.attrs['href']} title={node.attrs['tittle']}>
            {children}
        </a>
    );
};

export const TextEditor: React.FC<{ value: string }> = ({ value }) => {
    const [page, setPage] = useState('');
    
    useEffect(() => {
        async function getPage() {
            await axios.get(`http://3.35.27.172:3000/highlights/pdfs/${1}/pages/${7}`)
            .then((response) => {
                let markdown = '';
                
                for (let i = 0; i < response.data.result.length; i++) {
                    markdown += response.data.result[i].data;
                }
                
                setPage(markdown);
                
                console.log('markdown', markdown);
            })
        }
        
        console.log('useEffect');
        getPage();
    }, []);
    
    const { editor, loading, getInstance } = useEditor((root, renderReact) => {
        // const nodes = commonmark
            // .configure(image, { view: renderReact(Image) })
            // .configure(link, { view: renderReact(Link) })
            // .replace(cmCodeFence, codeFence(renderReact<Node>(CodeFence, { as: 'section' }))());
            
        const editor = Editor.make()
            .config((ctx) => {
                ctx.set(rootCtx, root);
                ctx.set(defaultValueCtx, page);
                ctx.get(listenerCtx).markdownUpdated((_, value) => {
                    // console.log(value);
                    return value;
                });
            }).use(block.configure(blockPlugin, {
                configBuilder: (ctx) => {
                    return [/* your actions */];
                }
            }))
            .use(nord)
            // .use(nodes)
            .use(gfm)
            .use(math)
            .use(tooltip)
            .use(prism)
            .use(listener)
            .use(collaborative)
            // .create();
        
            return editor
    }, [page]);
    
    useEffect(() => {
        if (!loading) {
            const instance = getInstance();
            instance?.action((ctx) => {
                const collabService = ctx.get(collabServiceCtx);
                const collabManager = new CollabManager(collabService);
                collabManager.flush(markdown);
                console.log('hi');
                if (connect$) {
                    connect$.onclick = () => {
                        collabManager.connect();
                    };
                }
        
                if (disconnect$) {
                    disconnect$.onclick = () => {
                        collabManager.disconnect();
                    };
                }
        
                if (apply$ && template$) {
                    apply$.onclick = () => {
                        if (template$ instanceof HTMLTextAreaElement) {
                            collabManager.applyTemplate(template$.value);
                        }
                    };
                }
        
                if (toggle$) {
                    toggle$.onclick = () => {
                        collabManager.toggleRoom();
                    };
                }
                // do something
            });
        }
    }, [getInstance, loading]);

    return <ReactEditor editor={editor}/>;
};
