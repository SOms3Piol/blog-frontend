import { useContext, useEffect, useState } from "react";
import { FaInfo } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";
import { BlogContext } from "../../Pages/Home/Home";

function Slider({ post , className}) {
  return (
    <>
      <div className={`flex flex-col gap-6 transition ease-in-out ${className}`}>
        <div className="aspect-video flex justify-center ">
          <img src={post.img} alt="" />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="flex justify-between items-center text-2xl font-semibold">
            {post.title}
            <span>
              <MdArrowOutward />
            </span>
          </h1>
          <p className="text-slate-700 text-ellipsis w-[630px]  inline-block h-[43px] whitespace-nowrap overflow-hidden">
            {post.desc}
          </p>
        </div>
      </div>
    </>
  );
}

function RecentPosts() {
  const {blogs} = useContext(BlogContext);
  return (
    <>
      {blogs && blogs.length > 0 ? (
        <div className="">
          <h1 className="text-2xl font-medium px-12">Recent Blog Posts</h1>
          <div className="px-12 grid grid-cols-2 py-10 gap-3 ">
            <Slider post={blogs[0]} className='max-md:hidden' /> 
            <div className="h-full flex md:flex-col gap-3 max-md:grid sm:max-md:grid-cols-2 max-sm:grid-cols-1">
              {
                blogs.length > 3 ? 
                blogs.slice(0,3).map(item =>(
                  <Item
                    key={item._id}
                    src={item.src}
                    title={item.title}
                    desc={item.desc}
                  />
                )) : blogs.map(item=>{
                 return <Item
                    key={item._id}
                    src={item.src}
                    title={item.title}
                    desc={item.desc}
                  />
                })
              }
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center px-3 gap-9">
          <div className="text-base flex gap-4 items-center px-5 h-[78px] bg-[#F7F6F7] border-t-4 mt-5 border-t-[#1E85BE]">
            <span>
              <FaInfo />
            </span>
            <h1>No blogs are published.</h1>
          </div>
          <div>
            <Link
              to={"/login"}
              className="px-6 py-2 hover:bg-black text-white w-[34px] bg-zinc-800 transition duration ease-in"
            >
              Proceed to Login or SignUp!
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function Item({ src, title, desc }) {
  return (
    <div className="flex gap-3 justify-center">
      <div className="w-[20vw]">
        <img src={src} className="w-full" alt="image" />
      </div>
      <div className="w-[23vw] py-2 flex flex-col gap-3">
        <h1 className="text-base font-semibold">{title}</h1>
        <p className="text-slate-700">{desc}</p>
        <Link to={"/blog"} className="overflow-hidden w-[122px]">
          <span className="relative w-[122px] text-nowrap overflow-x-hidden group/text">
            Continue Reading
            <span className="absolute w-full bg-slate-200 py-[1px] bottom-0 left-0 "></span>
            <span className="group-hover/text:absolute w-full group-hover/text:bg-black py-[1px] bottom-0 left-0 group-hover/text:translate-x-[125px] transition ease-linear duration-300"></span>
            <span className="group-hover/text:absolute w-full bg-black py-[1px] bottom-0 -left-[122px] group-hover/text:translate-x-[122px] transition ease-linear duration-300 group-hover:scale-100 delay-300 "></span>
          </span>
        </Link>
      </div>
    </div>
  );
}

export default RecentPosts;
