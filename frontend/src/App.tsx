import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications-component/dist/theme.css";
import { BrowserRouter as Router } from "react-router-dom";
import { authContext } from "./context/authContext";
import { useAuth } from "./hooks/authHook";
import { useRoutes } from "./routes";

const App = () => {
  const { login, logout, token, isReady } = useAuth();

  const isLogin = !!token;
  console.log(isLogin);
  const routes = useRoutes(isLogin);
  return (
    <authContext.Provider value={{ login, logout, token, isReady, isLogin }}>
      <Router>{routes}</Router>
    </authContext.Provider>
  );
};

export default App;
