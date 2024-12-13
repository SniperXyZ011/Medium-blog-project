import { BlogSkeleton } from "../components/BlogSkeleton";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { AppBar } from "../components/AppBar";

export default function Blog(){
    const {id} = useParams();
    const {loading , blog} = useBlog({id: id || ""})

    if(loading){
        return <div>
            <AppBar/>
            <div className="flex justify-center pt-10">
            <div>
            <BlogSkeleton/>
            </div>
            </div>
        </div>
    }

    // Ensure blog is defined before rendering FullBlog
    if (!blog) {
        return <div>Blog not found</div>;
    }
    
    return <div>
        <FullBlog blog={blog}/>
    </div>
}