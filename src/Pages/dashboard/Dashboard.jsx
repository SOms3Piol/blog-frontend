import { SlPlus, SlUser } from "react-icons/sl";
import { FaInfo } from "react-icons/fa";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { useAuth } from "../../context/useAuth";
import { useEffect, useState } from "react";
import { getToken } from '../../helpers/getToken'

function Sidebar() {
  return (
    <div className="rounded-xl py-10 px-3 flex flex-col h-[90vh] w-[20vw] bg-orange-300 gap-10">
      <h1 className="text-3xl px-5 text-white">
        <img
          src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png"
          className="mix-blend-multiply"
        />
      </h1>
      <ul className="flex flex-col items-start text-base gap-5 px-[63px]  ">
        <button>Dashboard</button>
        <button>Posts</button>
        <button>Category</button>
        <button>media</button>
        <button>Users</button>
        <button>Settings</button>
      </ul>
    </div>
  );
}

function Layout() {
  
  const { user , handleLogout } = useAuth();
  const [ blogs,  setBlogs ] = useState([]);
  const [ isDel , setIsDel ] = useState(false);

  useEffect(() => {
    const Fetch = async () => {
      const token = getToken();
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/blogs/userblogs`, {
        method:"GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      const response = await res.json();
      console.log(response.data)
      setBlogs(response.data);
    }
    Fetch()
  }, [isDel])


  return (
    <div className="w-full shadow bg-white rounded-xl h-[90vh] overflow-auto">
      <div className=" shadow border rounded-lg flex justify-end items-center gap-3 py-3 px-6">
        <Link to={"/"} className=" hover:underline">
          Home
        </Link>
        <button className="px-3 py-1 bg-zinc-700 border border-black rounded hover:bg-black transition ease-linear text-white rounded" onClick={handleLogout}>
          Logout
        </button>
        <div className="flex items-center gap-5">
          <span>{user}</span>
          <SlUser className="border p-1 rounded-[50%]" size={30} cursor={'pointer'} />
        </div>
      </div>
      <div className="px-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl px-5  py-8  capitalize underline">User's Blogs </h1>
          <Link
            to={'/create'}
            className="px-8"><SlPlus size={30} color="grey" /></Link>
        </div>
        {
          blogs &&  blogs.length > 0 ? blogs.map((blog, index) => (
            <Card
              key={index}
              src={blog.img}
              title={blog.title}
              desc={blog.desc}
              _id={blog._id}
              fromChild={setIsDel}
            />
          )) : (
            <div className=" flex flex-col justify-center px-3  gap-9 ">
              <div className="text-base flex gap-4 items-center px-5  h-[78px] bg-[#F7F6F7] border-t-4 mt-5 border-t-[#1E85BE]">
                <span>
                  <FaInfo />
                </span>
                <h1>No blogs are published.</h1>
              </div>
              <div>
                <Link
                  to={"/create"}
                  className=" px-6 py-2 hover:bg-black text-white w-[34px] bg-zinc-800 transition duration ease-in"
                >
                  Proceed to create!
                </Link>
              </div>
            </div>
          )

        }
      </div>
    </div>
  );
}

function Dashboard() {
  
  return (
    <div className="flex bg-slate-200 h-screen  items-center">
      <div className="flex w-full gap-3  px-5 ">
        <Sidebar  />
        <Layout />
      </div>
    </div>
  );
}

export default Dashboard;
