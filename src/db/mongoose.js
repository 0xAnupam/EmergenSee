// Connection established with MongoDB via mongoose
import mongoose from "mongoose";

export const connectMongoDB = async ()=>{
  if(mongoose.connection.readyState === 1){
    return mongoose.connection.asPromise();
  }
  // return await mongoose.connect(process.env.MONGO_URL);
  return await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.hspwrdh.mongodb.net/emergentsee?retryWrites=true&w=majority`);
}