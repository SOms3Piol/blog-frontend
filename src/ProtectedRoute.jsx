import { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getToken } from "./helpers/getToken";

function ProtectedRoute() {
  const [valid, setValid] = useState(false);
  const navigation = useNavigate();
  useEffect(() => {
    const token = getToken();
    
    const verify = async () => {
       if(!token) {
        return setValid(false);
       }
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/isValid`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
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
     navigation('/login')
  }else{
    return <Outlet />;
  }

  
}

export { ProtectedRoute };
