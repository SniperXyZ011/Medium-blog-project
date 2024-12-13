import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";
// import { format } from 'date-fns';

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  // const date = new Date(blogs.postDate)


  if (loading) {
    return (
      <div>
        <AppBar />
        <div className="flex justify-center ">
          <div>
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className=" top-0 w-full">
      <AppBar />
      </div>
      <div className="flex justify-center">
        <div className="">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name}
              title={blog.title}
              content={blog.content}
              publishedDate={blog.postDate.slice(0,10)}
            />
          ))}
        </div> 
      </div>
    </div>
  );
};
