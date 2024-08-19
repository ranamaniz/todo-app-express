import mongoose from "mongoose";

const MONGO_URI: string = process.env.MONGO_URI || "";

console.log(MONGO_URI);

const connectMongoDB = async () => {
  console.log("hello");
  try {
    // const res = await mongoose.connect(MONGO_URI);
    await mongoose.connect(MONGO_URI);

    // if the connection is done then console its connected
    // console.log(res);

    console.log("Connected to DB");
  } catch (e) {
    console.log("Sorry could not connec to the DB", e);
  }
};

export default connectMongoDB;
