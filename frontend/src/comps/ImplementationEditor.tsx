// import React ,{useState}from 'react'
// import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';

// const ImplementationEditor = ({ data }: { data: string }) => {
//   const [code,setCode] =  useState(data||"");

//   const handleEditorChange=(value:any,event:any)=>{
//       console.log("this is the value ",value);
//       setCode(value);
//   }
//   return (
//     <div className='h-full border-2 border-black'>
//         <Editor height="40vh" theme='vs-dark' defaultLanguage="Java" defaultValue={code} onChange={handleEditorChange}/>;
//     </div>
//   )
// }

// export default ImplementationEditor
import { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";

const ImplementationEditor = ({
  data,
  onCodeChange,
}: {
  data: string;
  onCodeChange: (value: string) => void;
}) => {
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onCodeChange(value);
    }
  };

  const [height, setHeight] = useState(200);
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const editorInstanceRef = useRef<any>(null); // To access the editor instance

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setHeight(entry.contentRect.height);

        // 🔥 Trigger Monaco layout update when height changes
        if (editorInstanceRef.current) {
          editorInstanceRef.current.layout();
        }
      }
    });

    if (editorContainerRef.current) {
      observer.observe(editorContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={editorContainerRef}
      className="h-full border-2 border-black"
      style={{
        resize: "vertical",
        overflow: "hidden",
        minHeight: "100px",
        maxHeight: "500px",
      }}
    >
      <Editor
        height={height}
        theme="vs-dark"
        className="rounded-lg"
        value={data}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
        }}
        onMount={(editor) => {
          editorInstanceRef.current = editor; // Store editor instance
        }}
      />
    </div>
  );
};

export default ImplementationEditor;
