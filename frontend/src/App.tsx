import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Title } from "./components/Title";
import { Profile } from "./components/Profile/Profile";
import { Info } from "./components/Profile/ProfileInfo";
import "bootstrap/dist/css/bootstrap.min.css";
import { Courses } from "./components/Profile/Courses";
import { Group } from "./components/Profile/Group";
import { Settings } from "./components/Profile/Settings";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Title children={undefined} />} />
        <Route path="/profile" element={<Profile />}>
          <Route path="info" element={<Info />} />
          <Route path="courses" element={<Courses />} />
          <Route path="group" element={<Group />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
