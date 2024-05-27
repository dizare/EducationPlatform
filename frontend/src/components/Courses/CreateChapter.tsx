// CreateChapter.tsx
import React, { useState } from "react";
import CreateTask from "./CreateTask";

interface Props {
  chapterFormName: string;
}

const CreateChapter: React.FC<Props> = ({ chapterFormName }) => {
  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setShowForm(true);
  };

  const handleCreateTask = () => {
    setShowForm(false);
  };

  return (
    <div className="addForm">
      <h1 className="main-text display-6" style={{ color: "white" }}>
        {chapterFormName}
      </h1>
      <div>
        <textarea
          className="form-control"
          placeholder="Описание раздела"
          rows={3}
        />
      </div>
      <CreateTask showForm={showForm} setShowForm={setShowForm} />
      <button
        type="button"
        className="btn btn-secondary"
        style={{ marginTop: "10px" }}
        onClick={openForm}
      >
        <span className="add-task-text">Создать задание</span>
      </button>
    </div>
  );
};

export default CreateChapter;
