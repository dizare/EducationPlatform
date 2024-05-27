// CreateTask.tsx
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { ReactComponent as CheckText } from "./check-text-box.svg";
import CodeEditor from "./CodeEditor";

interface Props {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateTask: React.FC<Props> = ({ showForm, setShowForm }) => {
  return (
    <Modal show={showForm} onHide={() => setShowForm(false)} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Название"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
            >
              <CheckText width="25" height="25" />
            </button>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="main-text">Текст задания</label>
        <textarea className="form-control" />
        <label className="main-text">Ответ</label>
        <input className="form-control"></input>
        <div className="App">
          <CodeEditor />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setShowForm(false)}>
          Добавить задание
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTask;
