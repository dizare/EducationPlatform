import React, { useState } from "react";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import "./MenuWindow.scss";

export const Group: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="windows-menu-content">
      <h1 className="h1-border display-5">Группа</h1>
    </div>
  );
};

export default Group;
