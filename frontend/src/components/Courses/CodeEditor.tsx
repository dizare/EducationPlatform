import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "./codeEditor.scss";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-python";

interface CodeEditorProps {
  setInputData: (data: string) => void;
  setOutputData: (data: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  setInputData,
  setOutputData,
}) => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    setInputData(input);
    setOutputData(output);
  }, [input, output, setInputData, setOutputData]);

  return (
    <div style={{ marginTop: "20px" }}>
      <div>
        <h1>решение</h1>
        <Editor
          className="code-window"
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages.python, "python")}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 25,
          }}
        />
        <div className="exampleCodeWindow">
          <div className="input-output-window">
            <h1>ввод</h1>
            <Editor
              value={input}
              onValueChange={(data) => setInput(data)}
              highlight={(data) => highlight(data, languages.python, "python")}
              padding={10}
              className="code-window"
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 25,
              }}
            />
          </div>
          <div className="input-output-window">
            <h1>вывод</h1>
            <Editor
              value={output}
              onValueChange={(data) => setOutput(data)}
              highlight={(data) => highlight(data, languages.python, "python")}
              padding={10}
              className="code-window"
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 25,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
