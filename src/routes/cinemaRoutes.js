import express from "express";
import {getCinemaSystemList, getCinemasBySystem, getCinemaSystemInfo} from "../controllers/cinemaController.js"
//import { verifyToken } from "../config/jwt.js";
 
const cinemaRoute = express.Router ();

cinemaRoute.get("/get-cinema-systems", getCinemaSystemList)
cinemaRoute.get("/get-cinemas-by-system/:systemId", getCinemasBySystem)
cinemaRoute.get("/get-system-info/:systemId", getCinemaSystemInfo)

 
export default cinemaRoute;