import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export function AppBar(){
    return <div className="flex justify-between px-10 border-b-2 p-2 mt-1">
        <div className="flex flex-col justify-center font-bold text-xl">
            <Link to={"/blogs"}>
                Medium
            </Link>
        </div>
        <div>
            <Link to={"/publish"}>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-1.5 mr-5 text-center me-2 mb-2">New</button>
            </Link>
            <Avatar name="Gaurav" size="big" />
        </div>
    </div>
}