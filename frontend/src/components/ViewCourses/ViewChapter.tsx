import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import "./ViewChapter.scss";
import "./ViewCourse.scss";
import ViewTask from "./ViewTask";
import Sidebar from "./Sidebar";

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
  description: string;
  chapters: Chapter[];
}

const ViewChapter: React.FC = () => {
  const { courseId, chapterId } = useParams<{
    courseId: string;
    chapterId: string;
  }>();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state.course as Course;

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        const chapterData = course.chapters.find(
          (chap) => chap.id === parseInt(chapterId || "0")
        );
        setChapter(chapterData || null);
      } catch (error) {
        console.error("Error fetching chapter data:", error);
      }
    };

    fetchChapterData();
  }, [chapterId, course]);

  const handleNext = () => {
    if (chapter && currentTaskIndex < chapter.tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      const currentChapterIndex = course.chapters.findIndex(
        (chap) => chap.id === parseInt(chapterId || "0")
      );
      if (
        currentChapterIndex >= 0 &&
        currentChapterIndex < course.chapters.length - 1
      ) {
        const nextChapterId = course.chapters[currentChapterIndex + 1].id;
        navigate(`/course/${courseId}/chapter/${nextChapterId}`, {
          state: { course },
        });
      } else {
        navigate("/profile");
      }
    }
  };

  const handlePrevious = () => {
    if (chapter && currentTaskIndex > 0) {
      setCurrentTaskIndex(currentTaskIndex - 1);
    } else {
      const currentChapterIndex = course.chapters.findIndex(
        (chap) => chap.id === parseInt(chapterId || "0")
      );
      if (currentChapterIndex > 0) {
        const previousChapterId = course.chapters[currentChapterIndex - 1].id;
        navigate(`/course/${courseId}/chapter/${previousChapterId}`, {
          state: { course },
        });
      } else {
        console.log("No previous chapters in this course.");
      }
    }
  };

  return (
    <div className="body-view-chapter">
      {/* <Sidebar courseId={courseId} chapters={course.chapters} /> */}
      <div className="main-view-chapter">
        {chapter ? (
          <div>
            <div className="chapter-header">
              <h1>{chapter.name}</h1>
              <p>{chapter.description}</p>
            </div>
            {chapter.tasks.length > 0 ? (
              <ViewTask
                key={chapter.tasks[currentTaskIndex].id}
                task={chapter.tasks[currentTaskIndex]}
              />
            ) : (
              <p>No tasks available.</p>
            )}
            <div className="navigation-buttons">
              <button
                className="btn btn-primary"
                onClick={handlePrevious}
                disabled={
                  currentTaskIndex === 0 &&
                  parseInt(chapterId || "0") === course.chapters[0].id
                }
              >
                Предыдущий шаг
              </button>
              <button className="btn btn-primary" onClick={handleNext}>
                {currentTaskIndex < chapter.tasks.length - 1
                  ? "Следующий шаг"
                  : course.chapters.findIndex(
                      (chap) => chap.id === parseInt(chapterId || "0")
                    ) <
                    course.chapters.length - 1
                  ? "Следующий раздел"
                  : "Завершить курс"}
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ViewChapter;
