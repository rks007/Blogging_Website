import { Blog } from "../hooks"
import { AppBar } from "./AppBar"

export const FullBlog = ({blog}: {blog: Blog}) => {
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
            </div>
            <div className=" col-span-4 hidden sm:block">
                Author
              <div className="text-xl font-bold mb-1 ml-3 pt-2">
                {blog.author.name}
              </div>  
              <div className="ml-3 text-slate-500">
                The medium is powered with great tech and have great capabilities to handle load
              </div>
            </div>
  
          </div>
        </div>
    </div>
    
}