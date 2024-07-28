import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/singleblog/${id}`,
      );
      const data = await response.json();
      setBlog(data);
    };
    fetchData();
  }, [id]);
  return (
    <div className="max-w-[900px] w-full py-3 mx-auto  h-full flex flex-col gap-3 ">
      <div className="banner aspect-video border rounded">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/${blog.img}`}
          alt="Image"
        />
      </div>
      <h1 className="p-3 w-full max-sm:w-full">{blog.title}</h1>
      <p className="p-3 w-full max-sm:w-full">{blog.desc}</p>
      <div dangerouslySetInnerHTML={blog.blocks}></div>
    </div>
  );
}

export default Blog;
