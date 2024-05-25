import React, { useState } from "react";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import "./MenuWindow.scss";

export const Info: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="h1-border display-5">Информация</h1>
    </div>
  );
};

export default Info;
