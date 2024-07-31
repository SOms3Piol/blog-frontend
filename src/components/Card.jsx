import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../helpers/getToken";
import { BlogContext } from "../Pages/Home/Home";

function Card({ src, title,  desc, _id }) {
  const { setDel } = useContext(BlogContext);
  const handleDelete = async () =>{
    const token = getToken();
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/blogs/delete/${_id}`,{
      method:"DELETE",
      headers:{Authorization: `Bearer ${token}`}
    })
    const response = await res.json();
    if(response.success){
      console.log(response)
      setDel(true)
    } 
  }

  return (

    <div className=" flex  gap-4  py-3 items-center ">
      <div className="">
        <img className="w-full h-full" src={src} />
      </div>
      <div>
      <Link to={`/blog/${_id}`}>
        <h1 className="text-xl font-medium letter-wide hover:underline ">
          {title}
        </h1>
        <p className="w-[500px] h-[35px] whitespace-nowrap text-ellipsis overflow-hidden">{desc}</p>
      </Link>
      <div className="flex gap-5">
        <Link to={`/edit/${_id}`} className="bg-green-600 text-white py-1 px-7 rounded">Edit</Link>
        <button 
        className="bg-red-600 text-white py-1 px-5 rounded"
        onClick={handleDelete}
        >Delete</button>
      </div>
      </div>
    </div>
  );
}

export default Card;
