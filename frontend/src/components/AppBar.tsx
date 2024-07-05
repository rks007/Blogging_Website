import { Link, useNavigate } from "react-router-dom"

export const AppBar = () => {
    const navigate = useNavigate();

    function logoutuser(){
        localStorage.removeItem('token');
        navigate('/signin');
    }
    return <div className=" border-b flex justify-between px-10 py-4">
        <div className=" flex justify-center items-center font-bold shadow-md p-1 w-28">
            <Link to={"/blogs"}>EchoBlog</Link>
        </div>
        <div className="flex">
            <button className="mr-10 ml-10 bg-green-500 rounded-lg p-1 hover:bg-green-600 active:bg-green-400"><Link to={'/publish'}>+Blog</Link></button>
            <button onClick={logoutuser} className="ml-10 bg-gray-300 rounded-lg p-1 hover:bg-gray-400 active:bg-gray-200">Logout</button>
        </div>
        

    </div>
}