import React, { useState } from "react";
import {
  Outlet,
  Route,
  Routes,
  useNavigate,
  useResolvedPath,
} from "react-router-dom";
import "./Profile.scss";
import Info from "./ProfileInfo";
import ProfileInfo from "./ProfileInfo";
import Courses from "./Courses";

export const Profile: React.FC = () => {
  const navigate = useNavigate();

  let path = useResolvedPath("").pathname;

  return (
    <body className="main-body">
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossOrigin="anonymous"
      ></script>
      <header className="header">
        <div className="main-header-text display-1">
          Образовательная платформа
        </div>
      </header>
      <div>
        <div className="profile-menu">
          <div>
            <div>
              <h1
                className="profile-h1 display-6"
                style={{ padding: "15px", color: "white" }}
              >
                Личный кабинет
              </h1>
              <div className="profile-menu-buttons">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("info")}
                >
                  Профиль
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("courses")}
                >
                  Курсы
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("group")}
                >
                  Группа
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("settings")}
                >
                  Настройки
                </button>
                <button className="btn btn-primary">Выход</button>
              </div>
            </div>
          </div>
          <div className="profile-menu-window" style={{ color: "white" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </body>
  );
};

export default Profile;
