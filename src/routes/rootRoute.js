import express from "express";
import cinemaRoute from "./cinemaRoutes.js";
import movieRoute from "./movieRoutes.js";
import authRoute from "./authRoute.js";
import showtimeRoute from "./showtimeRoutes.js";
import userRoute from "./userRoute.js";

 
const rootRoute = express.Router();
 
rootRoute.use("/cinema",cinemaRoute)
rootRoute.use("/movie", movieRoute)
rootRoute.use("/auth", authRoute)
rootRoute.use("/showtime", showtimeRoute)
rootRoute.use("/user", userRoute)

 
export default rootRoute;