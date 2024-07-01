import { ChangeEvent, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { SignupInput } from '@rks007/medium-common';
import axios from 'axios'
import { BACKEND_URL } from '../config';

export const Auth = ({type}: {type: "signup" | "signin"}) => {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })

    const navigate = useNavigate();

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate('/blogs')
        } catch (error) {
            alert(`Error while ${type === "signup" ? "Sign Up" : "Sign In"}`)
            setPostInputs({
                ...postInputs,
                name: " ",
                username: " ",
                password: " "
            })
        }
    }

    return <div className="h-screen  flex justify-center items-center  flex-col ">
        <div>
            <div className=' px-10'>
              <div className="text-xl font-extrabold">
                Create an Account
              </div>
              <div className="text-slate-400">
                {type === "signin" ? "Don't have an account?" : "Already have an account?"} 
                <Link to={type === "signin" ? "/signup" : "/signin"} className='pl-2 underline hover:text-slate-600 '>
                  {type === "signin" ? "Sign Up" : "Sign In"}
                </Link>
              </div>
            </div>
          <div className='pt-5'>
            {type ==="signin" ? "" : <LabelledInput label='Name' type='text' placeholder='john' onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    name: e.target.value
                })
            }}/>}
            <LabelledInput label='username' type={"text"} placeholder='john@gmail.com' onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    username: e.target.value
                })
            }}/>
            <LabelledInput label='password' type='password' placeholder='1234567' onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    password: e.target.value
                })
            }}/>
            <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 w-full mt-5 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign Up" : "Sign In"}</button>

        </div>
        </div>
        
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type: string
}
function LabelledInput({label, placeholder, onChange, type}: LabelledInputType){
    return <div>
    <label className="block mb-2 mt-2 text-sm font-medium text-black ">{label}</label>
    <input onChange={onChange} type={type} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
</div>
}