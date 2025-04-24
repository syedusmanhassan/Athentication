import mongoose from "mongoose";

 const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb+srv://usmanhasanwasti:F359CRF166NssOYf@cluster0.mpy9acb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("MongoDB connected");
    }catch(err){
        console.error("MongoDB connection error:", err);
        process.exit(1); 
    }

 };

export default connectDB;