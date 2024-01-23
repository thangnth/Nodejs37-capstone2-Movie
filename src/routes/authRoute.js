import express from "express";
import {signUpAdmin, signUpKhachHang,login, loginAdmin, logout} from "../controllers/authController.js"
//import { verifyToken } from "../config/jwt.js";
 
const authRoute = express.Router ();

authRoute.post("/signup-admin", signUpAdmin)
authRoute.post("/signup-KH", signUpKhachHang)
authRoute.post("/login", login) 
authRoute.post("/login-admin", loginAdmin)
authRoute.post("/logout", logout)


 
export default authRoute;