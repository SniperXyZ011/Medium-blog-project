import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b border-slate-200 pb-4 p-4 cursor-pointer hover:bg-purple-100 shadow-xl rounded-2xl">
        <div className="flex ">
          <div
            className={`rounded-full bg-red-200 w-8 h-8 flex justify-center shadow-xl shadow-sky-200`}
          >
            <span className="pt-1 text-xl text-gray-600">{authorName[0]}</span>
          </div>
          <div className="font-extralight px-2 text-sm m-1 ">
            {authorName}{" "}
            <span className="text-sm	font-bold	text-2xl text-slate-500">·</span>{" "}
          </div>
          <div className="font-thin text-slate-500 text-sm m-1">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-light text-slate-500">
          {content.slice(0, 100) + "...."}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-2">{`${Math.ceil(
          content.length / 200
        )} minute(s) read`}</div>
      </div>
    </Link>
  );
};

export function Avatar({ name, size = 7 }: { name: string; size?: number }) {
  return (
    //   <div className={`bg-slate-500 text-neutral-content w-${size} h-${size} rounded-full`}>
    //   {/* <span className="text-xl flex justify-center h-full pt-1 text-white">{name[0]}</span> */}
    // </div>
    <div
      className={`rounded-full bg-red-200 w-${size} h-${size} flex justify-center shadow-xl shadow-sky-200`}
    >
      <span className="pt-1 text-xl text-gray-600">{name[0]}</span>
    </div>
  );
}
