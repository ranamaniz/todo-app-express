import { compare, hash } from "bcryptjs";
import { JWT_SECRET } from "../config/config.js";
import User from "../model/User.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

async function register(req, res) {
  try {
    const data = req.body;
    console.log("data", data);

    // hash the password

    const { firstName, lastName, username, password, email } = data;
    //  check if they are empty or valid as email, name,
    // TODO: if username is already there, check and validate

    // TODO: check if valid names, email, etc

    const emailMatched = await User.find({ email });
    console.log(emailMatched);

    if (emailMatched) {
      throw new Error("Email already taken.");
    }

    const hashedPassword = await hash(password, 10);

    const userData = {
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    };

    const user = new User(userData);
    const response = await user.save();

    console.log("response", response);
    res.status(200).json({
      success: true,
      message: "Successfully registered the user",
      data: response,
    });
  } catch (e) {
    console.log("error:", e);

    const message = e?.message || "Sorry could not register the user";
    res.status(500).json({
      success: false,
      error: e,
      message,
      statusCode: "ERROR",
    });
  }
}

async function signin(req, res) {
  try {
    const data = req.body;
    console.log("data", data);

    // hash the password

    const { email, password } = data;

    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      throw new Error("Email not found.");
    }

    console.log("password, user.password", password, user.password);

    const match = await compare(password, user.password);
    console.log("match", match);
    if (!match) {
      throw new Error("Your password did not match.");
    }

    const accessToken = jwt.sign({ email: email, id: user?._id }, JWT_SECRET, {
      expiresIn: "30m",
    });

    const refreshToken = jwt.sign({ email: email, id: user?._id }, JWT_SECRET, {
      expiresIn: "30m",
    });

    const { _id: id, username, firstName, lastName } = user;

    const authData = {
      user: { id, email, username, firstName, lastName },
      accessToken,
      refreshToken,
    };

    // also add ther refresh token and refresh token expiry of user

    const response = new ApiResponse({
      statusCode: 200,
      message: "Logged in successfully",
      success: true,
      data: authData,
    });

    console.log("response", response);

    res.status(response.statusCode).json(response);
  } catch (e) {
    console.log("error:", e);

    const message = e?.message || "Sorry could not login";
    res.status(500).json({
      success: false,
      error: e,
      message,
      statusCode: "ERROR",
    });
  }
}

export { register, signin };
