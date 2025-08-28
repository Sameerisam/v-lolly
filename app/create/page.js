"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { HexColorPicker } from "react-colorful";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Create() {
  const [color, setColor] = useState("#db2777");
  const [colo, setColo] = useState("#f97316");
  const [col, setCol] = useState("#a16207");
  const [shareLink, setShareLink] = useState(null);
  const [openPicker, setOpenPicker] = useState(null); // "color" | "colo" | "col" | null

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // ✅ create refs individually at the top level
  const colorRef = useRef(null);
  const coloRef = useRef(null);
  const colRef = useRef(null);

  // ✅ memoize object so it doesn’t recreate on each render
  const pickerRefs = useMemo(
    () => ({
      color: colorRef,
      colo: coloRef,
      col: colRef,
    }),
    []
  );

  function onSubmit(data) {
    data.colors = [color, colo, col];
    axios.post("/api/outh", data).then((resp) => {
      console.log(resp.data);
      setShareLink(resp.data.link);
      reset({ to: "", message: "", from: "", color: "", colo: "", col: "" });
      setColor("#db2777");
      setColo("#f97316");
      setCol("#a16207");
    });
    console.log("data mill gia", data);
  }

  // outside click handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        openPicker &&
        pickerRefs[openPicker]?.current &&
        !pickerRefs[openPicker].current.contains(event.target)
      ) {
        setOpenPicker(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openPicker, pickerRefs]);








  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 mt-10 px-4">
        {/* Lollipop */}
        <div className="flex flex-col items-center">
          <div className="w-24 md:w-28 rounded-t-[40px] overflow-hidden shadow-lg">
            <div className="h-20" style={{ background: color }}></div>
            <input type="hidden" {...register("colors[0]")} value={color} />

            <div className="h-20" style={{ background: colo }}></div>
            <input type="hidden" {...register("colors[1]")} value={colo} />

            <div className="h-20" style={{ background: col }}></div>
            <input type="hidden" {...register("colors[2]")} value={col} />
          </div>
          <div className="w-6 h-20 bg-pink-300 rounded-b-2xl"></div>
        </div>

        {/* Color Pickers */}
        <div className="flex flex-row md:flex-col gap-6">
          {/* 1 */}
          <div className="relative" ref={pickerRefs.color}>
            <div
              className="w-10 h-10 rounded-full cursor-pointer border shadow-md"
              style={{ backgroundColor: color }}
              onClick={() =>
                setOpenPicker(openPicker === "color" ? null : "color")
              }
            ></div>
            {openPicker === "color" && (
              <div className="absolute top-12 z-10">
                <HexColorPicker color={color} onChange={setColor} />
              </div>
            )}
          </div>

          {/* 2 */}
          <div className="relative" ref={pickerRefs.colo}>
            <div
              className="w-10 h-10 rounded-full cursor-pointer border shadow-md"
              style={{ backgroundColor: colo }}
              onClick={() =>
                setOpenPicker(openPicker === "colo" ? null : "colo")
              }
            ></div>
            {openPicker === "colo" && (
              <div className="absolute top-12 z-10">
                <HexColorPicker color={colo} onChange={setColo} />
              </div>
            )}
          </div>

          {/* 3 */}
          <div className="relative" ref={pickerRefs.col}>
            <div
              className="w-10 h-10 rounded-full cursor-pointer border shadow-md"
              style={{ backgroundColor: col }}
              onClick={() =>
                setOpenPicker(openPicker === "col" ? null : "col")
              }
            ></div>
            {openPicker === "col" && (
              <div className="absolute top-12 z-10">
                <HexColorPicker color={col} onChange={setCol} />
              </div>
            )}
          </div>
        </div>

        {/* Form Section */}
        <div className="flex flex-col items-center mt-10 px-4 lg:ml-28">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-white w-[400px] rounded-xl bg-[#161616] shadow-md">
              <div className="p-6">
                <h4 className="text-neutral-300">To</h4>
                <input
                  {...register("to",{required:true})}
                  type="text"
                  className="bg-[#222222] w-full h-9 mt-3 px-2 [box-shadow:0_0_10px_#ec4899] border border-pink-300 focus:shadow-none outline-none"
                  placeholder="A lolly for..."
                />

       
                <h4 className="mt-7 text-neutral-300">Say something nice</h4>
                <textarea
                  {...register("message",{required:true})}
                  className="bg-[#161616] w-full h-40 mt-3 px-2 [box-shadow:0_0_10px_#ec4899] border border-pink-300 focus:shadow-none outline-none"
                  placeholder="Write a sweet message..."
                ></textarea>

                <h4 className="mt-7 text-neutral-300">From</h4>
                <input
                  {...register("from",{required:true})}
                  type="text"
                  className="bg-[#222222] w-full h-9 mt-3 mb-14 px-2 [box-shadow:0_0_10px_#ec4899] border border-pink-300 focus:shadow-none outline-none"
                  placeholder="From my friend"
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                className="px-8 py-3 ml-14 rounded-3xl border-2 text-pink-400 border-pink-300 [box-shadow:0_0_15px_#ec4899] 
                  hover:bg-pink-400 hover:text-black hover:border-pink-400 transition"
              >
                Freeze this lolly and get a link
              </button>
              {shareLink && (
               <p className="mt-4 ml-10 text-pink-300">
             Your link:{" "} 
        <a href={shareLink} target="_blank"  className="underline text-white">
          {shareLink}
              </a>
                 {" "} send to friend
          </p>
         )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
