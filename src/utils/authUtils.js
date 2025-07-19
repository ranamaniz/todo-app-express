import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
function createAccessToken(payload) {
  try {
    const accessToken = jwt.sign(payload, JWT_SECRET);
    return accessToken;
  } catch (e) {
    console.log(e);
  }
}
