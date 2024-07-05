import { useState } from "react";
import { AppBar } from "../components/AppBar";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks";
import { TextEditor } from "./Publish";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

function EditBlog() {
    const { id, heading, description } = useParams();
    const decodeTitle = heading ? decodeURIComponent(heading) : " ";
    const decodeContent = description ? decodeURIComponent(description): " ";
    const [title, setTitle] = useState(decodeTitle);
    const [content, setContent] = useState(decodeContent);
    const navigate = useNavigate();    
    
    const {loading, blog} = useBlog({
        id: id || ""
    });
    const blogId = id ? parseInt(id) : " ";
    // console.log(blogId, id);
    
    if(loading || !blog){
        return <div>
            <AppBar/>
            <div className="h-screen flex justify-center items-center">
                <div className="mb-20">
                    <Spinner/>
                </div>
                
            </div>
        </div>     
    }
    


    const editHandler = async () => {
        const response = await axios.put(`${BACKEND_URL}/api/v1/blog`,{
            id: blogId,
            title,
            content
        },
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }
        )
        // console.log(response.data.id.id);
        
        navigate(`/blog/${response.data.id.id}`)
    }



  return (
    <div>
      <AppBar/>
      <div className="flex justify-center pt-10">
          <div className="max-w-screen-lg w-full mx-20">
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Title" />
          </div>
      </div>
      <TextEditor value={content} onChange = {(e) => setContent(e.target.value)}/>
      <div className="flex justify-center">
        <div className="max-w-screen-lg w-full mx-20">
          <button onClick={editHandler} type="button" className="py-2.5 px-5 me-2 mt-5  text-sm font-medium text-gray-900 focus:outline-none bg-blue-300 rounded-full border border-gray-200 hover:bg-blue-400 focus:z-10 focus:ring-4 focus:ring-gray-100" aria-required>Publish</button>
        </div>
      </div>
    </div>  
  )
}

export default EditBlog