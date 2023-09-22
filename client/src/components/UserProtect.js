import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../apiCalls/users";
export const UserProtect = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const validateToken = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
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

  return <>{user && children}</>;
};
export default UserProtect;
