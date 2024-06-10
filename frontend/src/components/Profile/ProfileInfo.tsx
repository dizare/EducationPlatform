import React, { useContext, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./MenuWindow.scss";
import { IUser } from "./IUser";
import { ReactComponent as EditSvg } from "./pencil-square.svg";
import { ReactComponent as CheckSvg } from "./check.svg";
import axiosInstance from "../../axiosConfig";
import { authContext } from "../../context/authContext";

export const Info: React.FC = () => {
  const profile = useOutletContext<IUser>();
  const { token } = useContext(authContext);
  const [isEmailDisabled, setIsEmailDisabled] = useState(true);
  const [email, setEmail] = useState(profile.email); // Используем profile.email для инициализации email

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEmailDisabled(false);
    setIsEditing(true);
  };

  const handleConfirmClick = async () => {
    setIsEmailDisabled(true);
    setIsEditing(false);
    updateEmail();
    window.location.reload();
  };

  const updateEmail = async () => {
    try {
      await axiosInstance.put(
        `api/users/updateEmail/${profile.email}`,
        { newEmail: email } // Передаем новый email в теле запроса
      );
      // Обработка успешного обновления, если необходимо
    } catch (error) {
      console.error("Ошибка:", error);
      // Обработка ошибки (например, показ сообщения об ошибке)
    }
  };

  // Обработчик изменения текста в поле ввода
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value); // Обновляем состояние email при изменении текста в поле ввода
  };

  return (
    <div className="windows-menu-content">
      <h1 className="h1-border display-5">Информация</h1>
      <div>
        <a>Вы - {profile.role === "teacher" ? "учитель" : "ученик"}</a>
      </div>
      <div className="input-container">
        <input
          style={{ color: "black", marginTop: "3px" }}
          value={profile.firstName}
          disabled
        />
        <label>Имя</label>
      </div>
      <div className="input-container">
        <input
          style={{ color: "black", marginTop: "3px" }}
          value={profile.lastName}
          disabled
        />
        <label>Фамилия</label>
      </div>
      <div className="input-container">
        <input
          style={{ color: "black", marginTop: "3px" }}
          value={isEditing ? email : profile.email}
          disabled={isEmailDisabled}
          onChange={handleEmailChange}
        />
        <label>Почта</label>
        <div className="button-edit">
          <span>
            <button
              className="edit-button"
              onClick={isEditing ? handleConfirmClick : handleEditClick}
            >
              {isEditing ? <CheckSvg /> : <EditSvg />}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Info;
