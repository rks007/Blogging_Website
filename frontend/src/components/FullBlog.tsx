import { Blog } from "../hooks"
import { AppBar } from "./AppBar"
import {useNavigate, useParams} from 'react-router-dom'

export const FullBlog = ({blog}: {blog: Blog}) => {
  const loggerName = localStorage.getItem("name");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleEditClick = () => {
    if (loggerName == blog.author.name) {
      navigate(`/edit/${id}/${blog.title}/${blog.content}`);
    } else {
      alert("You can only edit your own blog post");
    }
  };
    return <div>
        <AppBar/>
        <div className=" flex justify-center">
          <div className=" grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
            <div className="col-span-8">
              <div className="text-5xl font-extrabold">
                  {blog.title}
              </div>
              <div className="text-slate-500 mt-2">
                Post on xx/xx/20xx
              </div>
              <div className="mt-2">
                  {blog.content}
              </div>
              <button 
              onClick={handleEditClick}
              className=" bg-yellow-300 p-2 w-20 mt-5 rounded-lg hover:bg-yellow-400 active:bg-yellow-500">Edit</button>
            </div>
            <div className=" col-span-4 hidden sm:block">
                Author
              <div className="text-xl font-bold mb-1 ml-3 pt-2">
                {blog.author.name}
              </div>  
              <div className="ml-3 text-slate-500">
                The EchoBlog is powered with great tech and have great capabilities to handle load
              </div>
            </div>
  
          </div>
        </div>
    </div>
    
}