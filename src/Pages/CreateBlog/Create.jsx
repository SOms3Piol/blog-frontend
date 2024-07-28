import { useState, useMemo } from "react";
import QuillEditor from "react-quill";
import { getToken } from "../../helpers/getToken.js";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

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

  function handleChange(e) {
    setImg(e.target.files[0]);
    setImgUrl(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("img", img);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("blog", value);
    const token = getToken();
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/blogs/create`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      },
    );
    const data = await response.json();
    console.log(data);
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
            src={!imgUrl ? "/blogbanner.png" : imgUrl}
            className="z-10 rounded-lg shadow hover:opacity-25"
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
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <QuillEditor
        className="w-full relative  rounded-lg max-sm:w-full h-[500px]"
        theme="snow"
        formats={formats}
        modules={modules}
        value={value}
        onChange={(value) => setValue(value)}
      />
      <button
        type="submit"
        className=" top-[43px] relative bg-blue-700 hover:bg-blue-800 transition ease-in px-3 py-2 text-white font-meduim Capitalize rounded"
      >
        Submit
      </button>
    </form>
  );
}

export default Create;
