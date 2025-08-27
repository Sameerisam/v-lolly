import mongoose from "mongoose";
export default mongoose.models.user || mongoose.model('user',{
    to:String,
    message:String,
    from:String,
    colors:[String],
     link:String   
})