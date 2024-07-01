import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if(loading){
        return <div>
            <AppBar/>
            <div className="flex justify-center">
                <div className="">
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                </div>
            </div> 
        </div>   
    }

    return <div className="">
        <div className="">
            <AppBar/>
        </div>
        <div className="flex justify-center">
          <div className=" ">
            {blogs.map(blog => <BlogCard
             id={blog.id}
             authorName={blog.author.name}
             title={blog.title}
             content={blog.content.substring(0,300)}
             publishedDate={"published on xx/xx/20xx"}
            />)}
          </div>
        </div>
    </div>
}