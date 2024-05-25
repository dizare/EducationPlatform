import React, { useState } from "react";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import "./MenuWindow.scss";

export const Courses: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="h1-border display-5">Курсы</h1>
      <div></div>
    </div>
  );
};

export default Courses;
