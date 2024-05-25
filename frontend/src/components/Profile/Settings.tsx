import React, { useState } from "react";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import "./MenuWindow.scss";

export const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="h1-border display-5">Настройки</h1>
    </div>
  );
};

export default Settings;
