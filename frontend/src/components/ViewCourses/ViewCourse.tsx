import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Courses/codeEditor.scss";
import axiosInstance from "../../axiosConfig";
import "./ViewCourse.scss";

interface Task {
  id: number;
  name: string;
  description: string;
  input: string;
  output: string;
}

interface Chapter {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
}

interface Course {
  id: number;
  name: string;
  theme: string;
  description: string;
  chapters: Chapter[];
}

const ViewCourse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/courses/courseDetails/${id}`
        );
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
    console.log(course?.chapters[0], course?.chapters[1]);
  }, [id]);

  const handleStart = () => {
    console.log(course?.chapters);
    if (course && course.chapters.length > 0) {
      course.chapters.sort((a, b) => a.id - b.id);
      navigate(`/course/${id}/chapter/${course.chapters[0].id}`, {
        state: { course },
      });
    }
  };

  return (
    <body className="body-view-course">
      <div>
        {course ? (
          <div>
            <div className="main-view-course">
              <h1 className="text-box-color">{course.name}</h1>
              <p className="text-box-color">{course.theme}</p>
              <p className="text-box-color">{course.description}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={handleStart} className="btn btn-primary">
                Приступить к выполнению
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </body>
  );
};

export default ViewCourse;
