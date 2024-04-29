import { AppBar } from "./AppBar";
import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

export function FullBlog({ blog }: {blog: Blog}){
    return <div>
        <AppBar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 w-full px-10 pt-12 max-w-screen-xl">
                <div className="col-span-8 p-4">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Posted on Dec 21, 2023
                    </div>
                    <div className="text-xl">
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-lg text-slate-500">
                        Author
                    </div>
                    <div className="flex">
                        <div className="flex flex-col justify-center pr-4">
                            <Avatar name={blog.author.name || "Anonymous"} size="big" />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-1">
                                 Random catch phrase about author's ability to catch users attention.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}