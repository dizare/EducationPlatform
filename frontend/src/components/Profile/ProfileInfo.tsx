import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import "./MenuWindow.scss";
import { IUser } from "./IUser";

export const Info: React.FC = () => {
  const profile = useOutletContext<IUser>();

  return (
    <div>
      <h1 className="h1-border display-5">Информация</h1>
      <div>{profile.firstName}</div>
      <div>{profile.lastName}</div>
    </div>
  );
};

export default Info;
