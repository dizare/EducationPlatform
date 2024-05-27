import React, { useState } from "react";
import "./Course.scss";
import { ReactComponent as PlusCircleIcon } from "./plus-circle-fill.svg";
import axiosInstance from "../../axiosConfig";
import CreateChapter from "./CreateChapter";
import useCurrentUserId from "../../hooks/currentUserId";

export const CreateCourse: React.FC = () => {
  const userId = useCurrentUserId();
  const [showForm, setShowForm] = useState(false);
  const [showChapterComponent, setShowChapterComponent] = useState(false);
  const [createCourseData, createCourse] = useState({
    Name: "",
    Theme: "",
    Description: "",
  });
  const openForm = () => {
    setShowForm(true);
  };

  const [chapterForm, setChapterForm] = useState({
    Name: "",
  });

  const closeForm = () => {
    setShowForm(false);
  };

  const handleCreateChapter = () => {
    setShowChapterComponent(true);
    setShowForm(false);
  };

  const handleCreateCourse = async () => {
    try {
      console.log(userId);
      const response = await axiosInstance.post(
        "api/courses/createCourse",
        {
          name: createCourseData.Name,
          theme: createCourseData.Theme,
          description: createCourseData.Description,
          num_of_task: 0,
          author: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(userId);
      console.log("Course created:", response.data);
      // Дополнительные действия при успешном создании курса
    } catch (error) {
      console.log(userId);
      console.error("Error creating course:", error);
      // Обработка ошибок при создании курса
    }
  };

  return (
    <body className="body">
      {/* <div> */}
      <h1 className="main-text h1-border display-5" style={{ color: "white" }}>
        Создание курса
      </h1>
      <div className="input-create-course">
        <input
          type="text"
          className="form-control"
          placeholder="Название курса"
          value={createCourseData.Name}
          onChange={(e) => {
            createCourse({ ...createCourseData, Name: e.target.value });
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Тема курса"
          value={createCourseData.Theme}
          onChange={(e) => {
            createCourse({ ...createCourseData, Theme: e.target.value });
          }}
        />
        <textarea
          className="form-control"
          placeholder="Описание"
          rows={3}
          value={createCourseData.Description}
          onChange={(e) => {
            createCourse({
              ...createCourseData,
              Description: e.target.value,
            });
          }}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleCreateCourse}
        >
          Создать курс
        </button>
      </div>
      <div className=" main-text display-6" style={{ color: "white" }}>
        Разделы:
      </div>
      {/*-------------- Форма создания раздела---------------- */}
      {/* {showForm ? ( */}
      <div className="addForm">
        {/* Здесь ваша форма */}
        <input
          type="text"
          className="form-control"
          placeholder="Название"
          // value={chapterForm.Name}
          // onChange={(e) => {
          //   setChapterForm({ ...chapterForm, Name: e.target.value });
          //   handleNameChange(e);
          // }}
        />
        {/* Другие поля формы */}
        <button
          type="button"
          className="button-hz btn btn-secondary"
          onClick={closeForm}
        >
          Закрыть форму
        </button>
        {/* {courseName && (
              <button
                type="button"
                className="button-hz btn btn-primary"
                style={{ marginLeft: "10px" }}
                onClick={handleCreateChapter}
              >
                Создать
              </button>
            )}
          </div>
        ) : (
          !showChapterComponent && (
            <div className="add-task">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={openForm}
              >
                <PlusCircleIcon color="white" width="50" height="50" />
                <span className="add-task-text">Добавить раздел</span>
              </button>
            </div>
          )
        )} */}
      </div>
      {/* // {showChapterComponent && <CreateChapter chapterFormName={courseName} />} */}
    </body>
  );
};

export default CreateCourse;
