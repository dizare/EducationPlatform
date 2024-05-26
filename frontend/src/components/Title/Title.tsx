import React, { useContext, useState } from "react";
import { ReactNotifications, Store } from "react-notifications-component";
import "./Title.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { authContext } from "../../context/authContext";
import axiosInstance from "../../axiosConfig";

export type AppProps = {
  children: React.ReactNode;
};

export const Title: React.FC<AppProps> = ({}) => {
  const [regForm, setRegForm] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Role: "",
  });
  const [loginForm, setLoginForm] = useState({
    Email: "",
    Password: "",
  });

  const [selected, setSelectedType] = useState("register");
  const [selectedRole, setSelectedRole] = useState("student");

  const { login } = useContext(authContext);

  const handleSelect = (option: "register" | "login") => {
    setSelectedType(option);
  };

  const roleSelect = (option: "student" | "teacher") => {
    setRegForm({ ...regForm, Role: option });
  };

  const fetchRegistration = async () => {
    console.log(regForm);
    await axiosInstance
      .post(
        "/api/auth/register",
        {
          email: regForm.Email,
          lastName: regForm.LastName,
          firstName: regForm.FirstName,
          password: regForm.Password,
          role: regForm.Role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Good response, registering");
        login(response.data.access_token);
      })
      .catch((err) => {
        for (let i = 0; i < err.response.data.message.length; i++) {
          Store.addNotification({
            title: "Ошибка",
            message: err.response.data.message[i],
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
        }
        console.error(err);
      });
  };

  const fetchLogin = async (e: React.FormEvent) => {
    console.log(loginForm);
    await axiosInstance
      .post(
        "/api/auth/login",
        {
          email: loginForm.Email,
          password: loginForm.Password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Good response, loging in");
        login(response.data.access_token);
      })
      .catch((err) => {
        var errorMessages = err.response.data.message;
        for (let i = 0; i < errorMessages.length; i++) {
          Store.addNotification({
            title: "Ошибка",
            message: errorMessages[i],
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
        }
        console.error(errorMessages);
      });
  };

  return (
    <body className="main-body">
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossOrigin="anonymous"
      ></script>
      <header className="header">
        <div className="main-header-text">Образовательная платформа</div>
      </header>
      <div className="main-div">
        <ReactNotifications />
        <div className="signup">
          <h1 className="main-h1">Добро пожаловать!</h1>
          <div className="button-switch">
            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option1"
              autoComplete="off"
              checked={selected === "register"}
              onChange={() => handleSelect("register")}
            />
            <label
              className="btn btn-outline-success"
              style={{ width: "120px", color: "white", borderWidth: "2px" }}
              htmlFor="option1"
            >
              Регистрация
            </label>

            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option2"
              autoComplete="off"
              checked={selected === "login"}
              onChange={() => handleSelect("login")}
            />
            <label
              className="btn btn-outline-success"
              style={{ width: "120px", color: "white", borderWidth: "2px" }}
              htmlFor="option2"
            >
              Вход
            </label>
          </div>
          {selected === "register" ? (
            <div className="form-main">
              <div
                className="btn-group"
                style={{ padding: "10px" }}
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio1"
                  autoComplete="off"
                  onChange={(e) => roleSelect("student")}
                />
                <label className="btn btn-outline-primary" htmlFor="btnradio1">
                  Ученик
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio2"
                  autoComplete="off"
                  onChange={() => roleSelect("teacher")}
                />
                <label className="btn btn-outline-primary" htmlFor="btnradio2">
                  Преподаватель
                </label>
              </div>
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Имя"
                    value={regForm.FirstName}
                    onChange={(e) =>
                      setRegForm({ ...regForm, FirstName: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Фамилия"
                    value={regForm.LastName}
                    onChange={(e) =>
                      setRegForm({ ...regForm, LastName: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Почта"
                    value={regForm.Email}
                    onChange={(e) =>
                      setRegForm({ ...regForm, Email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Пароль"
                    value={regForm.Password}
                    onChange={(e) =>
                      setRegForm({ ...regForm, Password: e.target.value })
                    }
                  />
                </div>
                <div className="main-btn">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={fetchRegistration}
                  >
                    Зарегистрироваться
                  </button>
                </div>
              </form>
            </div>
          ) : (
            // Логин
            <div className="form-main">
              <form>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Почта"
                    value={loginForm.Email}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, Email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Пароль"
                    value={loginForm.Password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, Password: e.target.value })
                    }
                  />
                </div>
                <div className="main-btn">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={fetchLogin}
                  >
                    Войти
                  </button>
                </div>
              </form>
            </div>
          )}
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </body>
  );
};
