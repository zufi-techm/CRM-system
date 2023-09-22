import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../apiCalls/users";
export const AdminProtect = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const validateToken = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success && response.user.role === "admin") {
        setUser(response.user);
      } else {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, []);

  return <div>{user && children}</div>;
};
export default AdminProtect;
