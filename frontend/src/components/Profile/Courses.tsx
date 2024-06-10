import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import "./MenuWindow.scss";
import axiosInstance from "../../axiosConfig";
import { authContext } from "../../context/authContext";
import { IUser } from "./IUser";
import CourseListView from "./CourseListView";

interface ICourse {
  id: string;
  name: string;
  theme: string;
  description: string;
  totalTasks: number;
  author: string;
}

export const Courses: React.FC = () => {
  const profile = useOutletContext<IUser>();
  const { token } = useContext(authContext);

  const [courses, setCourses] = useState<ICourse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (profile && profile.role === "teacher") {
      getCourses();
    }
  }, [profile]);

  const getCourses = async () => {
    try {
      const response = await axiosInstance.get("/api/courses/userCourses", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const routeChange = (courseId: string) => {
    navigate(`/editcourse/${courseId}`);
  };

  return (
    <div className="windows-menu-content">
      <h1 className="h1-border display-5">Курсы</h1>
      <div>
        {profile.role === "teacher" && (
          <button
            type="button"
            className="btn btn-success"
            onClick={() => navigate("/create-course")}
          >
            Создать курс
          </button>
        )}
      </div>
      <div>
        {profile.role === "teacher" && (
          <ul>
            {courses.map((course) => (
              <li
                key={course.id}
                onClick={() => routeChange(course.id)}
                className="course-item"
              >
                {course.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <CourseListView />{" "}
      {/* Рендеринг компонента с модальным окном поиска курсов */}
    </div>
  );
};

export default Courses;
