import { useEffect, useState } from "react";
import { FaAngleLeft, FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/singleblog/${id}`,
      );
      const data = await response.json();
      // console.log(data.data)
      setBlog(data.data);
    };
    fetchData();
  }, [id]);
  return (
    <>
    {
      blog && (
        <>
    <div className="max-w-[900px] w-full py-3 mx-auto  flex items-center justify-between">
      <Link to={`/edit/${blog._id}`} className="shadow h-[43px] w-[43px] flex justify-center items-center rounded-full">
        <FaAngleLeft size={20} />
      </Link>
      <div className="flex items-center gap-3"><FaUser color="grey"/> {blog.userId?.username}</div>
    </div>
    <div className="max-w-[900px] shadow w-full py-3 mx-auto  h-full flex flex-col gap-3 ">
      
      <div className="banner aspect-video  flex justify-center items-center rounded">
        <img
          src={`${blog.img}`}
          alt="Image"
        />
      </div>
      <h1 className="p-3 w-full max-sm:w-full">{blog.title}</h1>
      <p className="p-3 w-full max-sm:w-full">{blog.desc}</p>
      <div className="p-3 w -full max-sm:w-full" dangerouslySetInnerHTML={{ __html: blog.blog }}></div>
    </div>
    </>
      )
    }
    </>
  );
}

export default Blog;
