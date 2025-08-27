"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
// import "./dashboard.css"
export default function Dashboard(){
  const router=useRouter();
    return <>
    <div className=" text-white">

  

    <div className="flex flex-col items-center lg:flex-row md:flex-row justify-center mt-8 gap-3">
  <Image 
    src="/1-removebg-preview.png" 
    alt="Logo 1"
    width={128} 
    height={128} 
    className="h-auto"
  />
  <Image 
    src="/2-removing.png" 
    alt="Logo 2"
    width={128} 
    height={128} 
    className="h-auto"
  />
  <Image 
    src="/3-removebg-preview.png" 
    alt="Logo 3"
    width={128} 
    height={128} 
    className="h-auto"
  />
  <Image 
    src="/4-removebg-preview.png" 
    alt="Logo 4"
    width={128} 
    height={128} 
    className="h-auto"
  />
  <Image 
    src="/5-removebg-preview.png" 
    alt="Logo 5"
    width={128} 
    height={128} 
    className="h-auto"
  />
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