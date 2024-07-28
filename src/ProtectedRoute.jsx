import { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getToken } from "./helpers/getToken";

function ProtectedRoute() {
  const [valid, setValid] = useState(false);
  const navigation = useNavigate();
  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigation("/login");
    }
    const verify = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/isValid?token=${token}`,
      );
      const data = await res.json();
      if (data.success) {
        setValid(true);
      } else {
        setValid(false);
      }
    };
    verify();
  }, []);

  if (!valid) {
    <Navigate to={"/login"} />;
  }

  return <Outlet />;
}

export { ProtectedRoute };
