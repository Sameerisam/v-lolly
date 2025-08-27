"use client";
import { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { useForm } from "react-hook-form";
import axios from "axios";
import {useSearchParams} from 'next/navigation'

export default function Create() {
  let [color, setColor] = useState("#db2777");
  // let [open, setOpen] = useState(false);
  let [colo, setColo] = useState("#f97316");
  let [col, setCol] = useState("#a16207");
  // let [ope, setOpe] = useState(false);
  // let [op, setOp] = useState(false);
    const {register,handleSubmit, reset}=useForm(); 

    let params = useSearchParams();

function onSubmit(data){
axios.post('/api/outh',data).then((resp)=>{
console.log(resp.data)
// reset({to:'',message: '',from:''});
})
console.log("data mill gia",data)
}

useEffect(()=>{
debugger
  axios.put('/api/outh',{id:params.get('id')}).then((resp)=>{
setColor(resp.data.colors[0]);
setColo(resp.data.colors[1]);
setCol(resp.data.colors[2]);
reset({
  to:resp.data.to,
  message:resp.data.message,
  from:resp.data.from,

});
})


}, [params,reset])

let isReceiver = !!params.get("id")
  return (
    <>
<h1 className="text-center text-4xl mt-10 font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
  This is for you from your friend
</h1>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 mt-10 px-4">
        {/* Lollipop */}
        <div className="flex flex-col items-center">
          <div className="w-24 md:w-28  rounded-t-[40px] overflow-hidden shadow-lg">
            <div className="h-20"  style={{ background: color }}></div>
            <input type="hidden" {...register("colors[0]")} value={color} />
            <div className="h-20" style={{ background: colo }}></div>
            <input type="hidden" {...register("colors[1]")} value={colo} />
            <div className="h-20" style={{ background: col }}></div>
            <input type="hidden" {...register("colors[2]")} value={col} />
          </div>
          <div className="w-6 h-20 bg-pink-300 rounded-b-2xl"></div>
        </div>

        
        
      

      {/* Form Section */}
      <div className="flex flex-col items-center mt-10 px-4 lg:ml-28">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div  className="text-white w-[400px]  rounded-xl bg-[#161616] shadow-md">
          <div className="p-6">
            <h4 className="text-neutral-300">To</h4>
            <input {...register("to")}
              type="text"
              className="bg-[#222222] w-full h-9 mt-3 px-2 [box-shadow:0_0_10px_#ec4899] border border-pink-300 focus:shadow-none outline-none"
              placeholder="A lolly for..."
              readOnly={isReceiver}
            />

            <h4 className="mt-7 text-neutral-300">Say something nice</h4>
            <textarea {...register("message")}
              className="bg-[#161616] w-full h-40 mt-3 px-2 [box-shadow:0_0_10px_#ec4899] border border-pink-300 focus:shadow-none outline-none"
              placeholder="Write a sweet message..."
              readOnly={isReceiver}
            ></textarea>

            <h4 className="mt-7 text-neutral-300">From</h4>
            <input {...register("from")}
              type="text"
              className="bg-[#222222] w-full h-9 mt-3 mb-14 px-2 [box-shadow:0_0_10px_#ec4899] border border-pink-300 focus:shadow-none outline-none"
              placeholder="From my friend"
              readOnly={isReceiver}
            />
          </div>
       </div>

        {/* <div className="mt-8">
          <button
            type="submit"

            className="px-8 py-3 ml-14 rounded-3xl border-2 text-pink-400 border-pink-300 [box-shadow:0_0_15px_#ec4899] 
            hover:bg-pink-400 hover:text-black hover:border-pink-400 transition"
            
          >
            Freeze this lolly and get a link
          </button>

        </div> */}
        
         </form>
      </div>




      </div>
    </>
  );
}
