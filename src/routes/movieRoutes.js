import express from "express";
import {getMovies, getMoviesByPage, getMoviesByDate, getMovieById, postMovie, updateMovie, deleteMovie, postBanner, getBanners} from "../controllers/movieController.js"
import { verifyToken } from "../config/jwt.js";
 
const movieRoute = express.Router ();

movieRoute.get("/get-movies", getMovies);
movieRoute.get("/get-movies-pagination/:page", getMoviesByPage);
movieRoute.get("/get-movies-by-date/:page", getMoviesByDate);
movieRoute.get("/get-movie-by-id/:maPhim", getMovieById);
movieRoute.post("/post-movie", postMovie);
movieRoute.put("/update-movie", updateMovie);
movieRoute.delete("/delete-movie/:maPhim", deleteMovie);
movieRoute.post("/post-banner", verifyToken, postBanner)
movieRoute.get("/get-banners",  getBanners)

 
export default movieRoute;