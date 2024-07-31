import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import { getToken } from "../../helpers/getToken";
function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });


  useEffect(()=>{
    const token = getToken();
    if(token){
      navigate('/dashboard')
    }
  },[])

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { handleLogin } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = await handleLogin(data);
    setError(value);
    setData({
      email:"",
      password: ""
    })
  };
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <form
        onSubmit={(e)=>handleSubmit(e)}
        className="max-w-sm   mx-auto bg-white rounded  p-3 w-[750px]"
      >
        <div className=" text-4xl font-normal flex flex-col gap-3 ">
          <h1 className="tracking-wide">Login</h1>
          <p className="text-base tracking-tighter font-normal ">
            Welcome Back!
          </p>
          <p className="text-sm text-red-800">{error}</p>
        </div>
        <div className="mb-5 mt-3">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className=" border border-gray-300 text-gray-900 text-sm outline-none rounded-lg  block w-full p-2.5 "
            placeholder="example@example.com"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="s border border-gray-300 text-gray-900 text-sm outline-none rounded-lg  block w-full p-2.5 "
            placeholder="***********"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3  dark:bg-gray-700 "
              required
            />
          </div>
          <label
            htmlFor="terms"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
          </label>
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="text-white bg-zinc-800
            hover:bg-black  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>
          <Link
            to="/signup"
            className=" text-base  text-zinc-800  hover:underline"
          >
            Doesn't have any Account?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
