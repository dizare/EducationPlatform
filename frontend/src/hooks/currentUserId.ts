import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const useCurrentUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      setUserId(decoded.sub);
    }
  }, []);

  return userId;
};

export default useCurrentUserId;
