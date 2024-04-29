import { SignupInput } from "@npmgaurav/medium-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({type}: {type: "signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        username: "",
        password: "",
        name: ""
    })

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup" ? "signup" : "signin"}`,postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch(e){
            console.log("be request failed");
        }
    }
    return <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="font-bold text-3xl text-center">
                        {type === "signin"? "Login": "Create an account"}
                    </div>
                    <div className="text-slate-400 text-center font-semibold mb-3">
                        {type === "signin"? "Don't have an account?": "Already have an accoount?"}
                        <Link to={type === "signin"? "/signup": "/signin"} className="underline  pl-2">
                            {type === "signin"? "Sign up": "Login"}
                        </Link>
                    </div>
                </div>
                <LabelledInput label="Username" placeholder="Enter your email" onChange={(e)=> 
                    setPostInputs({
                        ...postInputs,
                        username: e.target.value
                    })
                }/>
                {type === "signup" ? <LabelledInput label="Name" placeholder="Enter your name" onChange={(e)=> 
                    setPostInputs({
                        ...postInputs,
                        name: e.target.value
                    })
                }/> : null}
                <LabelledInput label="Password" type="password" placeholder="password" onChange={(e)=> 
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                }/>
                <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full mt-4">{type === "signup"? "Sign up" : "Sign in"}</button>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
}
function LabelledInput({label, placeholder, onChange, type}: LabelledInputType){
    return <div className="mt-3">
    <label className="block mb-2 text-sm font-semibold text-gray-900 py-1">{label}</label>
    <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
</div>
}