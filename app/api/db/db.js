import mongoose from "mongoose";



export function connect(){
    mongoose.connect(process.env.MONGO_URL).then((data)=>{
        console.log("DB connected")
    }).catch((e)=>{
        console.log("not connected", e)
    })
}

