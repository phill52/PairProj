"use client";

import Quill from "quill";
import ReactQuill from "react-quill";
import { QuillBinding } from "y-quill";
import QuillCursors from "quill-cursors";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import { useEffect, useRef, useState } from "react";
import styles from "./components/Editor.module.css";

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
    console.log(data);
    if (data != undefined){
      //const yText = new Y.Text(data)
      
      console.log('setting text')
      text?.delete(0, text.length)
      text?.insert(0, data);
      //setText(yText);
    }
    
  }, [data]);


  if (!text || !provider) {
    return null;
  }

  return <QuillEditor yText={text} provider={provider} />;
}

type EditorProps = {
  yText: Y.Text;
  provider: any;
  
};

function QuillEditor({ yText, provider }: EditorProps) {
  const reactQuillRef = useRef<ReactQuill>(null);

  // Set up Yjs and Quill
  //const userInfo = useSelf((me) => me.info);
  
  useEffect(() => {
    let quill: ReturnType<ReactQuill["getEditor"]>;
    let binding: QuillBinding;

    if (!reactQuillRef.current) {
      return;
    }

    quill = reactQuillRef.current.getEditor();
    binding = new QuillBinding(yText, quill, provider.awareness);
    return () => {
      binding?.destroy?.();
    };
    
  }, [yText, provider]);

  return (
    <div className="container bg-white dark:bg-black rounded-md p-4">
      <ReactQuill
        className="editor text-black dark:text-white"
        placeholder="Start typing here…"
        ref={reactQuillRef}
        theme="snow"
        modules={{
          toolbar: false,
          history: { userOnly: true },
        }}
      />
    </div>
  );
  
}