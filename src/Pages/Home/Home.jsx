import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import RecentPosts from "../../components/RecentPost/RecentPosts";

function Home() {
  const [blogs, setBlogs] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/getallblogs`,
      );
      const data = await response.json();
      setBlogs(data.data);
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
      <h1 className="text-2xl font-medium px-12">All blogs posts</h1>
      <AllBlogs posts={blogs} />
    </>
  );
}

export default Home;


function AllBlogs({posts}){
  return(
    <div className="grid grid-cols-3 px-12 py-4">
       {
        (posts && posts.length > 0) && posts.map(item=>{
         return <div>
             <div>
               <img src={item.img} alt="" />
             </div>
             <h1 className="text-3xl text-slate-700">
              {item.title}
             </h1>
             <p className="text-xl text-slate-600 w-[300px] h-[33px] overflow-hidden text-ellipsis whitespace-nowrap">{item.desc}</p>
          </div>
        })
       }
    </div>
  )
}
