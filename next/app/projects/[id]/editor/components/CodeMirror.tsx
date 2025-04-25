// components/CodeMirrorEditor.tsx
import React, { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { yCollab } from 'y-codemirror.next';
import * as Y from 'yjs';

type Props = {
  yText: Y.Text;
  provider: any;
};

export default function CodeMirror({ yText, provider }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView>();

  useEffect(() => {
    if (!editorRef.current) return;

    const view = new EditorView({
      doc: yText.toString(),
      extensions: [
        basicSetup,
        javascript(),
        yCollab(yText, provider.awareness)
      ],
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };
  }, [yText, provider]);

  return <div ref={editorRef} className="rounded-md border" />;
}
