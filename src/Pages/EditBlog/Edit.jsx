import { useState, useMemo, useEffect } from "react";
// Importing core components
import QuillEditor from "react-quill";

import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams , Link } from "react-router-dom";
import { getToken } from "../../helpers/getToken";

const Edit = () => {
  // Editor state
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [img, setImg] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/singleblog/${id}`,
      );
      
      const {data} = await res.json();
      
      setImg(data.img);
      setTitle(data.title);
      setDesc(data.desc)
      setValue(data.blog);
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
    formData.append("file", img);
    formData.append("title", title);
    formData.append("desc" , desc);
    formData.append("blog", value);
    console.log(formData)
    const token = getToken();
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/blogs/update/${id}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      },
    );
    const data = await response.json();
    if (data.success) {
      navigate(`/blog/${data.data.id}`);
    }
  };

  return (
    <>
    <div className='relative  py-3 px-3 flex justify-end gap-4'>
      <button
        onClick={handleSubmit}
        type="submit"
        className=" bg-zinc-700 hover:bg-black transition ease-in px-5 py-1 text-white font-medium capitalize rounded"
      >
        Submit
      </button>
      <Link
        className="border text-black border-black hover:bg-black transition ease-in px-5 py-1 hover:text-white font-medium capitalize rounded"
        to={'/dashboard'}
      >
        Cancel
      </Link>
    </div>
    <form
      className="max-w-[900px] w-full py-3 mx-auto  h-full flex flex-col gap-3 "
    >
      <div className="aspect-video  flex justify-center  ">
        <label htmlFor="upload" className="z-20">
          <img
            src={
              imgUrl ? imgUrl : img
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
            onChange={(e)=>handleChange(e)}
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
        value={desc}
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
    </form>
    </>
  );
};

export default Edit;
