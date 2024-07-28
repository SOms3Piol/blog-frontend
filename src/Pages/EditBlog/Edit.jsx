import { useState, useMemo, useEffect } from "react";
// Importing core components
import QuillEditor from "react-quill";

import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { getToken } from "../../helpers/getToken";

const Edit = () => {
  // Editor state
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [img, setImg] = useState(null);
  const [blog, setBlog] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/singleblog/${id}`,
      );
      const data = await res.json();
      setBlog(data);
      setValue(blog.blog);
    };
    fetchData();
  }, []);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [],
  );

  function handleChange(e) {
    setImg(e.target.files[0]);
    setImgUrl(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("img", img);
    formData.append("title", title);
    formData.append("blog", value);
    const token = getToken();
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/blogs/update/${blog._id}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      },
    );
    const data = await response.json();
    if (data.success) {
      navigate(`/blog/${data._id}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[900px] w-full py-3 mx-auto  h-full flex flex-col gap-3 "
    >
      <div className="aspect-video  flex justify-center  ">
        <label htmlFor="upload" className="z-20">
          <img
            src={
              !imgUrl
                ? `${import.meta.env.VITE_BACKEND_URL}/${blog.img}`
                : imgUrl
            }
            className="z-10 rounded-lg shadow"
            alt="Image Banner w-full"
          />
          <input
            type="file"
            name="file"
            id="upload"
            hidden
            accept=""
            onChange={handleChange}
            className=""
          />
        </label>
      </div>
      <input
        type="text"
        placeholder="Enter the title"
        name="title"
        className="outline-none shadow rounded border p-3 w-full max-sm:w-full "
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Write a short description of blog."
        name="desc"
        className="outline-none shadow rounded border p-3 w-full max-sm:w-full"
        value={!desc ? blog.desc : desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <QuillEditor
        className="w-full  rounded-lg max-sm:w-full h-[90vh]"
        theme="snow"
        formats={formats}
        modules={modules}
        value={value}
        onChange={(value) => setValue(value)}
      />
      <button
        type="submit"
        className=" top-[43px] relative bg-zinc-800 hover:bg-black transition ease-in px-3 py-2 text-white font-meduim Capitalize rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default Edit;
