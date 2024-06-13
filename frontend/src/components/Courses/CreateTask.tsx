import React, { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import CodeEditor from "./CodeEditor";
import axiosInstance from "../../axiosConfig";
import { authContext } from "../../context/authContext";

interface Props {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  chapterId: number | null;
  courseId: number | undefined;
}

const CreateTask: React.FC<Props> = ({
  showForm,
  setShowForm,
  chapterId,
  courseId,
}) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState("");
  const { token } = useContext(authContext);

  const handleAddTask = async () => {
    const taskData = {
      name: taskName,
      description: taskDescription,
      input: inputData || null,
      output: outputData || null,
      chapterId: chapterId,
    };

    try {
      await axiosInstance.post("api/tasks/createTask", taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      updateCourseTotalTasks(courseId);
      setShowForm(false);
      setTaskName("");
      setTaskDescription("");
      setInputData("");
      setOutputData("");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const updateCourseTotalTasks = async (courseId: number | undefined) => {
    try {
      await axiosInstance.put(
        `api/courses/updateTotalTasks/${courseId}`,
        { increment: 1 }, // Указываем, что нужно увеличить TotalTasks на 1
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating course total tasks:", error);
    }
  };

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
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
          className="form-control"
          placeholder="Текст задания"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <div className="App">
          <CodeEditor
            setInputData={setInputData}
            setOutputData={setOutputData}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAddTask}>
          Добавить задание
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTask;
