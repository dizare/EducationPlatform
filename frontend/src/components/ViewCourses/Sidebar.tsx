import React from "react";
import { Link, useParams } from "react-router-dom";
import "./ViewChapter.scss";
import "./ViewCourse.scss";
import "./Sidebar.scss";

interface Task {
  id: number;
  name: string;
}

interface Chapter {
  id: number;
  name: string;
  tasks: Task[];
}

interface SidebarProps {
  courseId: string | undefined;
  chapters: Chapter[];
}

const Sidebar: React.FC<SidebarProps> = ({ courseId, chapters }) => {
  return (
    <div className="sidebar-body">
      {chapters.map((chapter) => (
        <div key={chapter.id} className="chapter-item">
          <h3>{chapter.name}</h3>
          <ul className="task-sidebar">
            {chapter.tasks.map((task) => (
              <li key={task.id}>
                <Link
                  to={`/course/${courseId}/chapter/${chapter.id}/task/${task.id}`}
                >
                  {task.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
