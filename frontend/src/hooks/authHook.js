import { useState, useEffect, useCallback } from "react";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const login = useCallback((jwtToken) => {
    console.log('AuthHook: settings token')
    setToken(jwtToken);
    localStorage.setItem(
      "token", jwtToken
    );
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    console.log(localStorage.getItem("token"))
    const data = localStorage.getItem("token");
    if (data) {
      login(data);
    }
    setIsReady(true);
  }, [login]);

  return { login, logout, token, isReady };
};
