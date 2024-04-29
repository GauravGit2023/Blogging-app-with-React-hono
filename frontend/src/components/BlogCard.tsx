import { Link } from "react-router-dom";

interface BlogCardType {
    name: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
}
// border-1 bg-white shadow-sm rounded-md m-4 p-2 py-4 min-w-full max-w-screen-md
export const BlogCard = ({name, title, content, publishedDate, id}: BlogCardType) => {
   return <Link to={`/blog/${id}`}>
    <div className="border-b-1 border-slate-300 shadow-sm rounded-md m-4 p-3 min-w-full max-w-screen-md cursor-pointer">
        <div className="flex">
            <div className="flex flex-col justify-center">
                <Avatar name={name} size="small"/>
            </div>
            <div className="pl-2 font-extralight text-sm flex flex-col justify-center">
                {name}
            </div>
            <div className="flex flex-col justify-center pl-2">
                <Circle />
            </div>
            <div className="text-slate-400 pl-2 font-thin text-sm flex flex-col justify-center">
                {publishedDate}
            </div>
        </div>
        <div className="text-xl font-semibold pt-1">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.replace(/(<([^>]+)>)/ig,"").slice(0, 200) + "..."}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
            {`${Math.ceil(content.length / 100)} minute(s) read`} 
        </div>
    </div> 
   </Link>
}

export function Circle(){
    return <div className="relative inline-flex items-center justify-center w-1 h-1 overflow-hidden bg-gray-600 rounded-full">
    
    </div>
}

export function Avatar({ name, size }: {name: string, size?: "small"|"big"}){
    return <div className={`${size === "small"? "w-6 h-6": "w-10 h-10"} relative inline-flex items-center justify-center overflow-hidden bg-gray-500 rounded-full`}>
    <span className="font-normal text-xs text-white">{name[0]}</span>
</div>
}