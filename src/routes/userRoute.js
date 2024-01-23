import express from "express";
import {getUserType, getUsers, getUserByPage, getUserprofile, updateUser, deleteUser, searchUser, searchUserPagination, deleteUserByAdmin} from "../controllers/userController.js"
import { verifyToken } from "../config/jwt.js";
 
const userRoute = express.Router ();

userRoute.get("/get-user-type", getUserType)
userRoute.get("/get-users", verifyToken, getUsers)
userRoute.get("/get-users-by-page/:page", verifyToken, getUserByPage)
userRoute.get("/get-user-profile", verifyToken, getUserprofile)
userRoute.put("/update-user", verifyToken, updateUser)
userRoute.delete("/delete-user", verifyToken, deleteUser)
userRoute.delete("/delete-user-by-admin", verifyToken, deleteUserByAdmin)
userRoute.get("/search-user", verifyToken, searchUser)
userRoute.get("/search-user-pagination/:page", verifyToken, searchUserPagination)


 
export default userRoute;