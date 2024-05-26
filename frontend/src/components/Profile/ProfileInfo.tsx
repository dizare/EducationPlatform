import React from "react";
import { useOutletContext } from "react-router-dom";
import "./MenuWindow.scss";
import { IUser } from "./IUser";

export const Info: React.FC = () => {
  const profile1 = useOutletContext<IUser>();

  return (
    <div>
      <h1 className="h1-border display-5">Информация</h1>
      <div>{profile1.firstName}</div>
      <div>{profile1.lastName}</div>
    </div>
  );
};

export default Info;
