import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

function Navbar() {
  const { user , handleLogout } = useAuth();
  return (
    <nav className="  relative  flex items-center justify-between px-5 ">
      <div>
        <img
          src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png"
          alt=""
          className="w-[8vw] h-[15vh]"
        />
      </div>
      <div className="flex gap-3 px-3 items-center font-medium">
        <Link to={"/"} className="hover:underline py-1 px-3">
          Home
        </Link>

        {!user ? (
          <>
            <Link
            to={'/login'}
              className="bg-zinc-800
              hover:bg-black  transition ease-out px-6 py-1 rounded text-white font-medium shadow"
            >
              Login
            </Link>
            <Link
            to={'/signup'}
              className="bg-zinc-800
            hover:bg-black  transition ease-out px-4  shadow py-1 text-white rounded"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to={"/dashboard"} className="hover:underline py-1 px-3">
              Me
            </Link>
            <button 
            onClick={handleLogout}
            className=" hover:text-white px-5 py-1 border font-medium hover:bg-black shadow border-black text-black transition ease-linear rounded ">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
