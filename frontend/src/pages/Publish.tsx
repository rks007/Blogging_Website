import { ChangeEvent, useState } from "react"
import { AppBar } from "../components/AppBar"
import axios from 'axios'
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    
    const publishPost = async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
            title,
            content
        },
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }
        )
        navigate(`/blog/${response.data.id}`)
    }

    return <div>
        <AppBar/>
      <div className="flex justify-center pt-10">
          <div className="max-w-screen-lg w-full mx-20">
            <input onChange={(e) => setTitle(e.target.value)} type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Title" />
          </div>
      </div>
      <TextEditor onChange = {(e) => setContent(e.target.value)}/>
      <div className="flex justify-center">
        <div className="max-w-screen-lg w-full mx-20">
          <button onClick={publishPost} type="button" className="py-2.5 px-5 me-2 mt-5  text-sm font-medium text-gray-900 focus:outline-none bg-blue-300 rounded-full border border-gray-200 hover:bg-blue-400 focus:z-10 focus:ring-4 focus:ring-gray-100" aria-required>Publish</button>
        </div>
      </div>
    </div>  
}

function TextEditor({onChange} : {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {

    return <form className="flex justify-center"> 
        <div className="max-w-screen-lg w-full mx-20">
          <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Content</label>
          <textarea onChange={onChange} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your Content here..." required></textarea>
        </div>
    </form>
}