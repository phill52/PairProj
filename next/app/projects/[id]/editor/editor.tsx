"use client";

import Quill from "quill";
import QuillCursors from "quill-cursors";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import { useEffect, useRef, useState } from "react";
// import styles from "./components/Editor.module.css";

import dynamic from "next/dynamic";
import React from "react";
import CodeMirror from "./CodeMirror";

// Collaborative text editor with simple rich text, live cursors, and live avatars
type DataProp = {
  data: string|undefined;
}

Quill.register("modules/cursors", QuillCursors);
export function CollaborativeEditor ({ data }: DataProp) {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [text, setText] = useState<Y.Text>();
  const [provider, setProvider] = useState<any>();
  
  

  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yText = yDoc.getText("quill");
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setText(yText);
    setProvider(yProvider);

    
    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  useEffect(() => {
    console.log('recieved data in editor');
    // console.log(data);
    if (data != undefined){
      //const yText = new Y.Text(data)
      
      console.log('setting text')
      text?.delete(0, text.length)
      text?.insert(0, data);
      //setText(yText);
    }
    
  }, [data, text]);


  if (!text || !provider) {
    return null;
  }

  return <CodeMirror yText={text} provider={provider} />;
}
