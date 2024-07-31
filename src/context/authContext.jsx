import { createContext, useEffect, useState } from "react";
import { setToken } from "../helpers/setToken";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext({});



function AuthProvider({ children }) {

  const navigation = useNavigate();
  const [user, setUser] = useState("");

  useEffect(()=>{
    setUser(localStorage.getItem('username'));
  },[])

  const handleSignUp = async (formData) => {
    if (formData.password != formData.Cpassword) {
      return "Passord Doesn't matched!";
    }
    const obj = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      },
    );
    const data = await response.json();
    if (data.success) {
      setToken(data.data.token);
      localStorage.setItem("email", data.data.email);
      navigation("/verify");
    }else{
      return data.message;
    }
  };
  const handleLogin = async (formData) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );
    
    const data  = await response.json();
    console.log(data);
    if (data.success ){
      setUser(data.data.username);
      setToken(data.data.token)
      localStorage.setItem('username' , data.data.username);
      navigation("/dashboard");
    } else {
      return data.message;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    navigation('/login');
  };

  return (
    <AuthContext.Provider
      value={{ user, handleSignUp, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
