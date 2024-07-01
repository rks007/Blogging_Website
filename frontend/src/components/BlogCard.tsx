import { Link } from "react-router-dom";

export interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number
}

export const BlogCard = ({authorName, title, content, publishedDate, id}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
      <div className=" p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
          <div className="flex">
              <div className="flex justify-center flex-col">
                <Avatar name={authorName}/>
              </div>
              <div className=" font-extralight pl-2 text-sm items-center flex">
                {authorName} 
              </div>
              <div className=" pl-2 font-thin text-slate-500 text-sm flex items-center">
                . {publishedDate}
              </div>
          </div>
          <div className=" text-xl font-semibold pt-2">
              {title}
          </div>
          <div className=" text-md font-thin">
              {content.slice(0.100) + "......"}
          </div>
          <div className="text-slate-500 text-sm font-thin pt-4">
              {`${Math.ceil(content.length/ 100)} minute(s) read`}
          </div>
      </div>
    </Link>
}

export function Avatar({name, size = 6}: {name: string, size?: number}){
    return <div className={`relative inline-flex items-center justify-center w-6 h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
      <span className="font-xs font-thin text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>
}