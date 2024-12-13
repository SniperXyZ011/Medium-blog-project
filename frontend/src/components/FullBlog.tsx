import { Blog } from "../hooks";
import { AppBar } from "./AppBar";
import { format } from "date-fns";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const date = new Date(blog.postDate);
  const formatDate = format(date, "dd MMM yyyy");
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-12 mx-10 pt-8 flex gap-4">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-400 pt-1">{formatDate}</div>
            <div className="pt-2 text-slate-600">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col justify-center h-full">
              <div className="text-slate-600 text-lg">Author </div>
              <div className="flex flex cols pt-2 gap-2">
                <div className="flex justify-center flex-col">
                  <div
                    className={`rounded-full bg-red-200 w-8 h-8 flex justify-center shadow-xl shadow-sky-200`}
                  >
                    <span className="text-xl text-gray-600">
                      {blog.author.name[0]}
                    </span>
                  </div>
                </div>
                <div className="">
                  <div className="text-xl font-extrabold">{` ~${blog.author.name}`}</div>
                  <div className="pt-2 text-slate-400">
                    Random catch phrase to grab the user attention
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
