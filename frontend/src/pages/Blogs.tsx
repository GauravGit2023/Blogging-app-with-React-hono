import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogsSkeloton } from "../components/BlogsSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = ()=>{
    const {loading, blogs} = useBlogs();

    if(loading){
        return <div>
            <AppBar />
            <div className="flex justify-center">
                <div className="">
                    <BlogsSkeloton />
                    <BlogsSkeloton />
                    <BlogsSkeloton />
                    <BlogsSkeloton />
                </div>
            </div>
        </div>
    }
    return <div>
        <AppBar />
        <div className="flex justify-center">
            <div className="p-4">
                {blogs.map(blog => 
                    <BlogCard name={blog.author.name || "Anonymous"} 
                    content={blog.content} 
                    title={blog.title}  
                    publishedDate={"Dec 12, 2024"}
                    id={blog.id} />
                )}                
            </div>
        </div>
    </div>
}