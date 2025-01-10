import { Schema, model } from "mongoose";

// for now just email and password
// TODO: add first name , lastname , and others later

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true },
//   accessToken: { type: String, required: true },
//   accessTokenExpiry: { type: Date },
//   refreshToken: { type: String },
//   refreshTokenExpiry: { type: String },
});

const User = model("User", userSchema);

export default User;
