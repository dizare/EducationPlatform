import React, { useState } from "react";
import { highlight, languages } from "prismjs";
import Editor from "react-simple-code-editor";
import axiosInstance from "../../axiosConfig";
import { ReactComponent as CorrectSvg } from "./check-square.svg";
import { ReactComponent as IncorrectSvg } from "./x-square.svg";
// import "./ViewTask.scss";

interface Task {
  id: number;
  name: string;
  description: string;
  input: string;
  output: string;
}

interface ViewTaskProps {
  task: Task;
}

const ViewTask: React.FC<ViewTaskProps> = ({ task }) => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [memory, setMemory] = useState("");
  const [cpuTime, setCpuTime] = useState("");

  const handleExecute = async () => {
    setOutput("");
    setMemory("");
    setCpuTime("");

    const finallyCode = code + "\r\n" + task.input;
    console.log(finallyCode);
    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/api/jdoodle/execute",
        {
          script: finallyCode,
          language: "python3",
          versionIndex: "3",
          clientId: "5d1d4087a6236a34b7a6bd630891ad9d",
          clientSecret:
            "992c7b5925aff4855133a107c5fb4b7770d7f964b10cc288749587dd2c89cc6d",
        }
      );

      setOutput(response.data.output);

      if (response.data.output.trim() === task.output.trim()) {
        setMemory(response.data.memory);
        setCpuTime(response.data.cpuTime);
      }
    } catch (error) {
      console.error("Error executing code:", error);
      setOutput("Error executing code");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <div style={{ display: "flex" }}>
        <div className="task-description">
          <h3>{task.name}</h3>
          <p>{task.description}</p>
        </div>
        <div className="input-output-windows">
          <div>
            <p className="header-window">Ввод</p>
            <Editor
              className="code-editor-view-input-output code-window"
              value={task.input}
              onValueChange={(code) => {}}
              highlight={(code) => highlight(code, languages.python, "python")}
              padding={10}
              readOnly
            />
          </div>
          <div style={{ minWidth: "13vh" }}>
            <p>Вывод</p>
            <Editor
              className="code-editor-view-input-output code-window"
              value={task.output}
              onValueChange={() => {}}
              highlight={(code) => highlight(code, languages.python, "python")}
              padding={10}
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="solution-window">
        Решение:
        <Editor
          className="code-editor-view-solution code-window"
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages.python, "python")}
          padding={10}
          style={{ minWidth: "10vh" }}
        />
        <button
          className="button-submit btn btn-primary"
          onClick={handleExecute}
        >
          Отправить
        </button>
        {output && (
          <div>
            {output.trim() === task.output.trim() ? (
              <div className="output-solution">
                <span>
                  <CorrectSvg />
                </span>
                <p>Memory: {memory}</p>
                <p>CPU Time: {cpuTime}</p>
              </div>
            ) : (
              <div className="output-solution">
                <span>
                  <IncorrectSvg />
                </span>
                <p>{output}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTask;
