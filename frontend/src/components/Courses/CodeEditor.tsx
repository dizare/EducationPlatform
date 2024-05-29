import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/themes/prism.css"; // Импортируйте тему стилей Prism
import "prismjs/components/prism-javascript"; // Импортируйте язык для подсветки синтаксиса
import axiosInstance from "../../axiosConfig";

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState("");

  const finallyCode = code + "\r\n" + inputData;
  const handleExecute = async () => {
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
    } catch (error) {
      console.error("", error);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <div>
        <div>
          {/* Редактор для ввода кода программы */}
          <h1>ввод для проверки задания</h1>
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              highlight(code, languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              color: "#fff",
              backgroundColor: "#282c34",
            }}
          />
          <h1>ввод</h1>
          {/* Редактор для ввода входных данных */}
          <Editor
            value={inputData}
            onValueChange={(data) => setInputData(data)}
            highlight={(data) =>
              highlight(data, languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              color: "#fff",
              backgroundColor: "#282c34",
            }}
          />
          <h1>вывод</h1>
          {/* Редактор для вывода результатов выполнения */}
          <Editor
            value={outputData}
            onValueChange={(outdata) => setOutputData(outdata)}
            highlight={(outdata) =>
              highlight(outdata, languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              color: "#fff",
              backgroundColor: "#282c34",
            }}
          />
        </div>
      </div>
      {/* Кнопка для выполнения кода */}
      <button onClick={handleExecute} style={{ marginTop: "10px" }}>
        Выполнить код
      </button>
      {/* Показываем результат выполнения только если есть */}
      {output && (
        <div
          style={{
            marginTop: "10px",
            whiteSpace: "pre-wrap",
            backgroundColor: "#282c34",
            color: "#fff",
            padding: "10px",
          }}
        >
          <h3>Вывод:</h3>
          <pre>{output}</pre>
        </div>
      )}
      {/* Проверка соответствия вывода и введенного текста */}
      {outputData && outputData === output && (
        <div>
          <h3>верно</h3>
        </div>
      )}
      {outputData && outputData != output && (
        <div>
          <h3>неверно</h3>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
