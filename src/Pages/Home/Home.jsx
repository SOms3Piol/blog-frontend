import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import RecentPosts from "../../components/RecentPost/RecentPosts";

function Home() {
  const [blogs, setBlogs] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/getallblogs`,
      );
      const data = await response.json();
      setBlogs(data);
    };
    fetchData();
  }, []);
  return (
    <>
      <Navbar />

      <div className=" relative h-[300px]  flex flex-col justify-center items-center gap-6">
        <h1 className="text-6xl font-semibold">
          Inside Design: Stories And Interviews
        </h1>
        <p className="text-xl text-slate-600">
          Subscibe to learn about new product features, the latest in
          technology, and updates.
        </p>
        <div className=" gap-1 rounded-xl px-3 relative border  flex w-[39vw] py-1 ">
          <input
            type="email"
            className=" px-3  py-2  w-full outline-none rounded text-xl"
            placeholder="Email Address"
          />
          <button className="  py-2 px-9 text-white bg-zinc-800 font-semibold hover:bg-black transition ease-linear right-1 top-1 rounded">
            Subscibe
          </button>
        </div>
      </div>
      <RecentPosts posts={blogs} />
    </>
  );
}

export default Home;
