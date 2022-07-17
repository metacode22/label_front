/* Copyright 2021, Milkdown by Mirone. */

import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { prism } from '@milkdown/plugin-prism';
import { tooltip } from '@milkdown/plugin-tooltip';
import { codeFence as cmCodeFence, commonmark, image, link } from '@milkdown/preset-commonmark';
import { Node } from '@milkdown/prose/model';
import { ReactEditor, useEditor, useNodeCtx } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import { FC, ReactNode, useEffect } from 'react';

import { CodeFence } from './CodeFence';
import { codeFence } from './CodeFence/codeFence.node';
import { Image } from './Image';
import { block, blockPlugin } from '@milkdown/plugin-block';
import React from 'react';

import { collaborative, CollabService, collabServiceCtx } from '@milkdown/plugin-collaborative';
import { math } from '@milkdown/plugin-math';
import { gfm } from '@milkdown/preset-gfm';
// import { nord } from '@milkdown/theme-nord';
import { WebsocketProvider } from 'y-websocket';
import { Doc } from 'yjs';

const markdown = `
# Milkdown Collaborative Example
---
Now you can play!
`;

const options = [
    { color: '#5e81AC', name: 'milkdown user 1' },
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
    private room = 'milkdown';
    private doc!: Doc;
    private wsProvider!: WebsocketProvider;

    constructor(private collabService: CollabService) {
        if (room$) {
            room$.textContent = this.room;
        }
    }

    flush(template: string) {
        this.doc?.destroy();
        this.wsProvider?.destroy();

        this.doc = new Doc();
        this.wsProvider = new WebsocketProvider('ws://localhost:3000', this.room, this.doc, { connect: autoConnect });
        this.wsProvider.awareness.setLocalStateField('user', options[rndInt]);
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

export const Milkdown: FC<{ value: string }> = ({ value }) => {
    const { editor, loading, getInstance } = useEditor((root, renderReact) => {
        const nodes = commonmark
            .configure(image, { view: renderReact(Image) })
            .configure(link, { view: renderReact(Link) })
            .replace(cmCodeFence, codeFence(renderReact<Node>(CodeFence, { as: 'section' }))());
        const editor = Editor.make()
            .config((ctx) => {
                ctx.set(rootCtx, root);
                ctx.set(defaultValueCtx, value);
                ctx.get(listenerCtx).markdownUpdated((_, value) => {
                    value;
                    // console.log(value);
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
            
    });
    
    useEffect(() => {
        if (!loading) {
            const instance = getInstance();
            instance?.action((ctx) => {
                const collabService = ctx.get(collabServiceCtx);
                const collabManager = new CollabManager(collabService);
                collabManager.flush(markdown);
        
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

    return <ReactEditor editor={editor} />;
};
