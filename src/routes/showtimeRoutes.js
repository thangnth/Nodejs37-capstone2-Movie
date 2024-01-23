import express from "express";
import {getShowtimeByMovie, getShowtimeByCinemaSystem, postShowTime, getSeats, bookSeat} from "../controllers/showtimeController.js"
import { verifyToken } from "../config/jwt.js";
 
const showtimeRoute = express.Router ();

showtimeRoute.get("/get-showtime-by-movie/:maPhim", getShowtimeByMovie);
showtimeRoute.get("/get-showtime-by-cinema-system/:maHeThongRap", getShowtimeByCinemaSystem);
showtimeRoute.post("/post-showtime", postShowTime);
showtimeRoute.get("/get-seats/:maLichChieu", verifyToken, getSeats);
showtimeRoute.post("/book-seat/:maLichChieu", verifyToken, bookSeat);


 
export default showtimeRoute;