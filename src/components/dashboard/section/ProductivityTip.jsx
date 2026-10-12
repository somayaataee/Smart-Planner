import { IoMdFlashlight } from "react-icons/io";

export default function Productivity(){
    return(
        <div style={{text:'var(--text)',borderColor:'var(--border)',background:'var(--card)'}} className=" w-100 md:w-50 md:block hidden mr-2 mt-2 p-6 text-center border rounded-2xl">
        <h1><IoMdFlashlight className="sidebar-icon text-yellow-300"/> Productivity Tip</h1>
        <p className="py-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        
        </div>
    )
}