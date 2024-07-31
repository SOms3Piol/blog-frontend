import { Link } from "react-router-dom";


function _404(){
    return(
        <div className="flex  flex-col justify-center items-center h-screen">
            <div className="flex gap-3 items-center ">
            <span className="text-5xl ">404</span><span className="px-[1px] h-[53px] bg-black"></span> <span className="text-3xl text-slate-700">This Page could not be found!</span>
            </div>
            <Link to={'/'} className="hover:underline py-9">Home</Link>
        </div>
    )
}
export default _404