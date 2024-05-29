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
    <Modal
      show={showForm}
      onHide={() => setShowForm(false)}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Название"
              style={{ minWidth: "350px" }}
            />
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="main-text">Текст задания</label>
        <textarea className="form-control" />
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
