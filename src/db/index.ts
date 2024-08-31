import mongoose from "mongoose";

const MONGO_URI: string = process.env.MONGO_URI!;

console.log("MONGO_URI", MONGO_URI);

const connectMongoDB = async () => {
  console.log("hello");
  try {
    // const res = await mongoose.connect(MONGO_URI);
    const conectionInstance = await mongoose.connect(`MONGO_URI/${DB_NAME}`);

    // if the connection is done then console its connected
    // console.log(res);

    console.log(
      "Connected to MongoDB, DB HOST:",
      conectionInstance.connection.host
    );
  } catch (e) {
    console.log("Sorry could not connect to the DB", e);
  }
};

export default connectMongoDB;
