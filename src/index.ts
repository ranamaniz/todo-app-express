import "dotenv/config";
import connectMongoDB from "./db";
import { app } from "./app";

const PORT = process.env.PORT || 8080;
try {
  await connectMongoDB();

  app.on("error", (error) => {
    throw error;
  });

  app.listen(PORT, () => {
    console.log("listening to port", PORT);
  });
} catch (e) {
  console.log("MONGO DB connection failed: ", e);
}
