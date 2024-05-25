import React, { useState } from "react";

import axios from "axios";
import "./Title.scss";

import "bootstrap/dist/css/bootstrap.min.css";

export type AppProps = {
  children: React.ReactNode;
};

export const Title: React.FC<AppProps> = ({}) => {
  const [login, setLogin] = useState({
    Name: "",
    SecondName: "",
    Email: "",
    Password: "",
  });
  const [selected, setSelected] = useState("register");

  const handleSelect = (option: "register" | "login") => {
    setSelected(option);
  };
  const fetchData = async () => {
    try {
      console.log(await axios.post("https://localhost:8080/profile", login));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Имя"
                    value={login.Name}
                    onChange={(e) =>
                      setLogin({ ...login, Name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Фамилия"
                    value={login.SecondName}
                    onChange={(e) =>
                      setLogin({ ...login, SecondName: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Почта"
                    value={login.Email}
                    onChange={(e) =>
                      setLogin({ ...login, Email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Пароль"
                    value={login.Password}
                    onChange={(e) =>
                      setLogin({ ...login, Password: e.target.value })
                    }
                  />
                </div>
                <div className="main-btn">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={fetchData}
                  >
                    Зарегистрироваться
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="form-main">
              <form>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Почта"
                    value={login.Email}
                    onChange={(e) =>
                      setLogin({ ...login, Email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Пароль"
                    value={login.Password}
                    onChange={(e) =>
                      setLogin({ ...login, Password: e.target.value })
                    }
                  />
                </div>
                <div className="main-btn">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={fetchData}
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
