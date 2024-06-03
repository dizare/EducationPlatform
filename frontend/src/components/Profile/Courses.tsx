import React, { useContext, useEffect, useState } from "react";
import {
  Route,
  Router,
  Routes,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import "./MenuWindow.scss";
import axiosInstance from "../../axiosConfig";
import { jwtDecode } from "jwt-decode";
import { authContext } from "../../context/authContext";
import { IUser } from "./IUser";

export const Courses: React.FC = () => {
  const profile = useOutletContext<IUser>();

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/create-course`;
    navigate(path);
  };

  return (
    <div className="windows-menu-content">
      <h1 className="h1-border display-5">Курсы</h1>
      <div>
        {profile.role === "teacher" && (
          <button
            type="button"
            className="btn btn-success"
            onClick={routeChange}
          >
            Создать курс
          </button>
        )}
      </div>
    </div>
  );
};

export default Courses;
