import React, { useEffect, useState } from "react";
import "./Course.scss";
import { ReactComponent as PlusCircleIcon } from "./plus-circle-fill.svg";
import axiosInstance from "../../axiosConfig";
import CreateChapter from "./EditingCourse";
import useCurrentUserId from "../../hooks/currentUserId";
import { Outlet, useNavigate } from "react-router-dom";
import { ICourse } from "./ICourse";

export const CreateCourse: React.FC = () => {
  let navigate = useNavigate();
  const userId = useCurrentUserId();
  const [createCourseData, createCourse] = React.useState({
    name: "",
    theme: "",
    description: "",
    totalTasks: 0,
    author: "",
  });

  const handleCreateCourse = async () => {
    try {
      console.log(userId);
      const response = await axiosInstance.post(
        "http://localhost:8080/api/courses/createCourse",
        {
          name: createCourseData.name,
          theme: createCourseData.theme,
          description: createCourseData.description,
          totalTasks: createCourseData.totalTasks,
          author: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const createdCourseId = response.data.id;
      console.log("Course created:", response.data);
      navigate(`/editcourse/${createdCourseId}`);
    } catch (error) {
      console.log(userId);
      console.error("Error creating course:", error);
    }
  };

  return (
    <body className="body">
      <div className="input-create-course">
        <h1
          className="main-text h1-border display-5"
          style={{ color: "white" }}
        >
          Создание курса
        </h1>
        <input
          type="text"
          className="form-control"
          placeholder="Название курса"
          value={createCourseData.name}
          onChange={(e) => {
            createCourse({ ...createCourseData, name: e.target.value });
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Тема курса"
          value={createCourseData.theme}
          onChange={(e) => {
            createCourse({ ...createCourseData, theme: e.target.value });
          }}
        />
        <textarea
          className="form-control"
          placeholder="Описание"
          style={{ height: "400px" }}
          rows={3}
          value={createCourseData.description}
          onChange={(e) => {
            createCourse({
              ...createCourseData,
              description: e.target.value,
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
    </body>
  );
};

export default CreateCourse;
