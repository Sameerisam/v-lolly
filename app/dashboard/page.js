"use client";

import Create from "../create/page";
import { useRouter } from "next/navigation";
// import "./dashboard.css"
export default function Dashboard(){
  const router=useRouter();
    return <>
    <div className=" text-white">

  

    <div className="flex flex-col items-center lg:flex-row  md:flex-row justify-center mt-8 gap-3">
   <img src="\1-removebg-preview.png" className="w-32 h-auto "></img>
   <img src="\2-removing.png" className="w-32 h-auto "></img>
   <img src="\3-removebg-preview.png" className="w-32 h-auto "></img>
   <img src="\4-removebg-preview.png" className="w-32 h-auto "></img>
   <img src="\5-removebg-preview.png" className="w-32 h-auto "></img>
    </div>

    <div className="flex justify-center mt-6">
 <button type="button" className="px-10 py-3  mb-14 rounded-4xl border-2 text-pink-400 border-pink-300 [box-shadow:0_0_15px_#ec4899] 
       hover:bg-pink-400 hover:text-black " onClick={()=>{
      router.push("/create")
       }} >Make a new lolly to a friend</button>

    </div>
    </div>
   
    </>
}