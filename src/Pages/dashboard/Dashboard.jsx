import { SlNotebook } from "react-icons/sl";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { useAuth } from "../../context/useAuth";

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
  const { user } = useAuth();
  return (
    <div className="w-full bg-white rounded-xl h-[90vh] overflow-auto">
      <div className=" flex justify-end items-center gap-3 py-3 px-6">
        <Link to={"/"} className=" hover:underline">
          Home
        </Link>
        <button className="px-3 py-1 bg-blue-700 hover:bg-blue-800 transition ease-linear text-white rounded">
          Logout
        </button>
      </div>

      <div className="px-5">
        <h1 className="text-xl capitalize underline pb-8">Top Blog</h1>
        <Card
          src={
            "https://img.freepik.com/free-vector/flat-abstract-business-youtube-thumbnail-template_23-2148912293.jpg?t=st=1721555292~exp=1721555892~hmac=2eb1ed557134cc147e614f14a6a33ca081c4974f7d29bd684ff8ff53edac75fc"
          }
          title={"How to promote the business"}
        />
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="flex bg-slate-200 h-screen  items-center">
      <div className="flex w-full gap-3  px-5 ">
        <Sidebar />
        <Layout />
      </div>
    </div>
  );
}

export default Dashboard;
