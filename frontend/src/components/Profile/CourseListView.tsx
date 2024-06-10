// CourseListView.tsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";
import { Button, Modal, Form } from "react-bootstrap";
import { ICourse } from "../Courses/ICourse";
import "./CourseListView.scss";

const CourseListView: React.FC = () => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<ICourse[]>([]);
  const [authors, setAuthors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get("/api/courses/allCourses");
        setCourses(response.data);
        setFilteredCourses(response.data);
        fetchAuthors(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
    filterCourses(value);
  };

  const filterCourses = (query: string) => {
    const filtered = courses.filter((course) =>
      course.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const fetchAuthors = async (courses: ICourse[]) => {
    const authorIds = Array.from(
      new Set(courses.map((course) => course.author))
    ); // Получаем уникальные ID авторов
    try {
      const promises = authorIds.map((authorId) => getAuthorName(authorId)); // Создаем массив промисов для получения имен авторов
      const authorsData = await Promise.all(promises); // Ждем выполнения всех промисов
      const authorsObj: { [key: string]: string } = {};
      authorIds.forEach((id, index) => {
        authorsObj[id] = authorsData[index]; // Создаем объект с именами авторов
      });
      setAuthors(authorsObj); // Устанавливаем имена авторов в состояние
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const getAuthorName = async (authorId: string) => {
    try {
      const response = await axiosInstance.get(
        `/api/users/getById/${authorId}`
      );
      const user = response.data;
      return `${user.firstName} ${user.lastName}`; // Возвращаем имя и фамилию автора
    } catch (error) {
      console.error("Error fetching author:", error);
      return ""; // В случае ошибки возвращаем пустую строку
    }
  };

  return (
    <div>
      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowSearchModal(true)}
        >
          Поиск курсов
        </button>
        <Modal
          show={showSearchModal}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={() => setShowSearchModal(false)}
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Публичные курсы</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="searchQuery">
              <Form.Control
                type="text"
                placeholder="Название курса"
                value={searchQuery}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Отображение списка курсов */}
            <div className="index-course-list">
              {filteredCourses.map((course) => (
                <button
                  className="index-course-list-element btn btn-primary"
                  key={course.id}
                >
                  <h5>{course.name}</h5>
                  <div className="index-course-list-element-inside">
                    Тема: <a>{course.theme}</a>
                  </div>
                  <div className="index-course-list-element-inside">
                    Автор: <a>{authors[course.author]}</a>
                  </div>
                  <div className="index-course-list-element-inside">
                    Общее количество заданий: <a>{course.totalTasks}</a>
                  </div>
                </button>
              ))}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default CourseListView;
