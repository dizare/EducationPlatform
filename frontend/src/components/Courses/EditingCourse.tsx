import React, { useContext, useEffect, useState } from "react";
import "./Course.scss";
import { ReactComponent as PlusCircleIcon } from "./plus-circle-fill.svg";
import { useParams } from "react-router-dom";
import { ICourse } from "./ICourse";
import { IChapter } from "./IChapter";
import axiosInstance from "../../axiosConfig";
import { authContext } from "../../context/authContext";
import CreateChapter from "./CreateChapter";
import CreateTask from "./CreateTask";

interface Props {
  courseFormName: string;
}

export const EditingCourse: React.FC<Props> = ({ courseFormName }) => {
  const { id } = useParams();
  const [showChapterForm, setShowChapterForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [chapterId, setChapterId] = useState<number | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<IChapter | null>(null);
  const token = useContext(authContext);

  const [courseData, setCourseData] = useState<ICourse | null>(null);
  const [chapterData, setChapterData] = useState<IChapter[]>([]);

  useEffect(() => {
    getCourseData();
    getChapterData();
  }, []);

  const handleCreateChapter = async () => {
    try {
      await handleCreateChapter;
      getChapterData();
    } catch (error) {
      console.error("Error creating chapter:", error);
    }
  };

  const openChapterForm = (chapter: IChapter) => {
    setSelectedChapter(chapter);
    setShowChapterForm(true);
  };

  const openTaskForm = () => setShowTaskForm(true);
  const closeTaskForm = () => setShowTaskForm(false);

  const getCourseData = async () => {
    try {
      const response = await axiosInstance.get(`/api/courses/course/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourseData(response.data);
      console.log(response.data.chapters);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  const getChapterData = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/chapters/chapterByCourse/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChapterData(response.data);
      console.log(response.data.chapters);
    } catch (error) {
      console.error("Error fetching chapter data:", error);
    }
  };

  return (
    <div className="body-create-course">
      <header
        className="headerCreateCourse main-text h1-border display-5"
        style={{ color: "white" }}
      >
        {courseData?.name}
      </header>
      <div style={{ display: "inline-flex", flexDirection: "column" }}>
        <div className="main-text display-6" style={{ color: "white" }}>
          Разделы:
        </div>
        <div className="chapter-buttons">
          {chapterData.map((chapter, index) => (
            <button
              className="btn btn-primary chapter-created"
              key={index}
              onClick={() => openChapterForm(chapter)}
            >
              <h3>{chapter.name}</h3>
              <p>{chapter.description}</p>
            </button>
          ))}
        </div>
        <div className="add-task">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={openTaskForm}
          >
            <PlusCircleIcon color="white" width="50" height="50" />
            <span className="add-task-text">Добавить раздел</span>
          </button>
          <CreateChapter
            showForm={showTaskForm}
            setShowForm={setShowTaskForm}
            onChapterCreated={handleCreateChapter}
          />
          <CreateTask
            showForm={showChapterForm}
            setShowForm={setShowChapterForm}
          />
        </div>
      </div>
    </div>
  );
};

export default EditingCourse;
