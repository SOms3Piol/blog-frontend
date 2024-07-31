import { useState , useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QuillEditor from "react-quill";
import { getToken } from "../../helpers/getToken.js";
import "react-quill/dist/quill.snow.css";

function Create() {
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState();

  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    setImgUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if(!img || !title || !desc || !value){
      return;
    }
    console.log(img)
    formData.append("file", img);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("blog", value);
    const token = getToken();
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/blogs/create`,
      {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`
       },
        body: formData,
      },
    );
    const data = await response.json();
    if (data.success) {
      navigate(`/blog/${data.data._id}`);
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
      className="max-w-[900px] w-full py-3 mx-auto h-full flex flex-col gap-3 relative"
    >
      <div className="aspect-video flex justify-center">
        <label htmlFor="upload">
          <img
            src={!imgUrl ? "/blogbanner.png" : imgUrl}
            className="rounded-lg shadow hover:opacity-25"
            alt="Image Banner w-full"
          />
          <input
            type="file"
            name="file"
            id="upload"
            hidden
            accept=".jpg , .jpeg"
            onChange={(e)=>handleChange(e)}
          />
        </label>
      </div>
      <input
        type="text"
        placeholder="Enter the title"
        name="title"
        className="outline-none shadow rounded border p-3 w-full max-sm:w-full"
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
        className="w-full relative rounded-lg max-sm:w-full h-[500px]"
        theme="snow"
        formats={formats}
        modules={modules}
        value={value}
        onChange={(value) => setValue(value)}
      />
    </form>
    </>
  );
}

export default Create;
