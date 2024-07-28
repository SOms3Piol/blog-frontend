import { Link } from "react-router-dom";

function Card({ src, title, _id }) {
  return (
    <div className=" flex flex-col gap-4  w-[433px] ">
      <div className="w-[433px] h-[242px]">
        <img className="w-full h-full" src={src} />
      </div>
      <Link to={`/blog/${_id}`}>
        <p></p>
        <h1 className="text-xl font-medium letter-wide hover:underline ">
          {title}
        </h1>
      </Link>
      <div className="flex gap-5">
        <Link className="bg-green-600 text-white py-1 px-7 rounded">Edit</Link>
        <Link className="bg-red-600 text-white py-1 px-5 rounded">Delete</Link>
      </div>
    </div>
  );
}

export default Card;
