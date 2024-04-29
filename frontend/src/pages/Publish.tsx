import axios from "axios"
import { AppBar } from "../components/AppBar"
import { BACKEND_URL } from "../config"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import JoditEditor from 'jodit-react';

export function Publish(){
    const [title, setTitle] = useState("");

    return <div>
        <AppBar />
        <div className="flex justify-center mt-12">
            <div className="w-screen max-w-screen-lg">
                <div className="p-5">
                    <input onChange={(e)=> setTitle(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="title" required />
                </div> 
                <TextEditor title={title} />    
            </div>
        </div>
    </div>
}

//  { onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}
// placeholder="Write your thoughts here..."
function TextEditor({ title }: {title: string}){
    const editor = useRef(null);
    const [content, setContent] = useState("");

    return <div className="px-5">            
        <JoditEditor 
        ref={editor}
        value={content}
        onChange={(newContent)=> setContent(newContent)} 
        className="block h-screen max-h-full p-2.5 mb-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
        <Button title={title} content={content} />
    </div>
}

function Button({ title, content }: {
    title: string;
    content: string;
}){
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    return <div>
        <button onClick={async ()=>{
            setIsLoading(true);
            try{
                if(title && content){
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                        title,
                        content
                    },{
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    });
                    navigate(`/blog/${response.data.id}`);
                } else{
                    alert("Invalid inputs error");
                    navigate("/blogs");
                }
            } catch(e){
                alert("Error while creating blog");
            }
        }} type="submit" className="inline-flex items-center px-5 py-2.5 mt-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
        {isLoading ? <Spinner size={6} /> : 'Publish post'}
        </button>
    </div>
}