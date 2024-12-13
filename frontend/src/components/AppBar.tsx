import { Link } from "react-router-dom";
import { useName } from "../hooks";

export const AppBar = () => {
  const { name } = useName();
  return (
    <div className="border-b flex justify-between px-10 py-3">
      <Link to={`/blogs`}>
        {" "}
        <div className="flex m-1 cursor-pointer border-2 border-slate-700 p-1 rounded-xl shadow-lg shadow-sky-100 bg-purple-100">
          Medium
        </div>
      </Link>

      <div className="flex gap-4">
        <Link to={"/publish"}>
          <button className="bg-green-400 p-1 px-4 mr-4 rounded-2xl hover:bg-green-300 m-1 shadow-lg shadow-green-600">
            New
          </button>
        </Link>
        <div
          className={`rounded-full bg-cyan-200 w-10 h-10 flex justify-center shadow-xl shadow-sky-200`}
        >
          <span className="text-3xl text-gray-600">{name[0]}</span>
        </div>
      </div>
    </div>
  );
};
