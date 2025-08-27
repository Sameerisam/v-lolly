import mongoose from "mongoose";



export function connect(){
    mongoose.connect("mongodb://localhost:27017/lolly").then((data)=>{
        console.log("DB connected")
    }).catch((e)=>{
        console.log("not connected", e)
    })
}

