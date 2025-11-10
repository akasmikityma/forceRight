
import { useState, useRef, useEffect } from "react"
import Editor from "@monaco-editor/react"

const ImplementationEditor = ({
  data,
  onCodeChange,
}: {
  data: string
  onCodeChange: (value: string) => void
}) => {
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onCodeChange(value)
    }
  }

  const [height, setHeight] = useState(200)
  const editorContainerRef = useRef<HTMLDivElement | null>(null)
  const editorInstanceRef = useRef<any>(null)

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(entry.contentRect.height)

        if (editorInstanceRef.current) {
          editorInstanceRef.current.layout()
        }
      }
    })

    if (editorContainerRef.current) {
      observer.observe(editorContainerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={editorContainerRef}
      className="h-full border-2 border-blue-400 rounded-lg overflow-hidden"
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
          editorInstanceRef.current = editor
        }}
      />
    </div>
  )
}

export default ImplementationEditor
