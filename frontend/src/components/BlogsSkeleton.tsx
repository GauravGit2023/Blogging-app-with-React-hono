
import { Circle } from "./BlogCard"

export const BlogsSkeloton = () => {
    return <div role="status" className="animate-pulse">
    <div className="p-4 border-b border-slate-300 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                <div className="flex flex-col justify-center">
                    <div className="h-6 w-6 bg-gray-200 rounded-full mb-4"></div>
                </div>
                <div className="pl-2 font-extralight text-sm flex flex-col justify-center">
                    <div className="h-2.5 bg-gray-200 rounded-full w-12 mb-4"></div>
                </div>
                <div className="flex flex-col justify-center pl-2 pb-4">
                    <Circle />
                </div>
                <div className="text-slate-400 pl-2 font-thin text-sm flex flex-col justify-center">
                    <div className="h-2.5 bg-gray-200 rounded-full w-12 mb-4"></div>
                </div>
            </div>
            <div className="text-xl font-semibold pt-1">
                <div className="h-2 bg-gray-200 rounded-full max-w-[530px] mb-2.5"></div>
            </div>
            <div className="text-md font-thin">
                <div className="h-2 bg-gray-200 rounded-full max-w-[550px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[660px]"></div>
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                <div className="h-2.5 bg-gray-200 rounded-full w-12 mb-4"></div> 
            </div>
        <span className="sr-only">Loading...</span>
    </div>
</div>
}