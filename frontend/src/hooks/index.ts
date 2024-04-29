import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
    content: string;
    title: string;
    id: string;
    author: {
        name: string;
    }
}

export function useBlog({ id }: {id: string}){
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then((response)=>{
            setBlog(response.data.post);
            setLoading(false);
        })
    },[])

    return {
        loading,
        blog
    }
}

export function useBlogs(){
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{
        setTimeout((r)=>r,5000);
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then((response)=>{
            setBlogs(response.data.blogs);
            setLoading(false);
        })
    },[])

    return {
        loading,
        blogs
    }
}