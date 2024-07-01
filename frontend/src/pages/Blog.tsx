import { AppBar } from "../components/AppBar";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks"
import { useParams } from 'react-router-dom'

export const Blog = () => {
    const { id } = useParams();

    const {loading, blog} = useBlog({
        id: id || ""
    });
   


    if(loading || !blog) {
        return <div>
            <AppBar/>
            <div className="h-screen flex justify-center items-center">
                <div className="">
                    <Spinner/>
                </div>
                
            </div>
        </div>    
    }

    return <div>
        <FullBlog blog={blog}/>
    </div>
}