import React from "react";
import { Button } from "react-bootstrap";
import { IBluRay } from "../interfaces/IBluRay";
import "./MovieDetails.css";
interface IMovieDetails {
  data: IBluRay;
}
function MovieDetails(props: IMovieDetails) {
  const movieData = props.data;
  const picPath =
    movieData.movieInfo.poster_path === null
      ? "https://aimint.org/ap/wp-content/uploads/sites/18/2016/04/image-placeholder-vertical.jpg"
      : `https://image.tmdb.org/t/p/original/${movieData.movieInfo.poster_path}`;
  return (
    <div className="movie-details-container shadow-lg rounded p-2">
      <div className="movie-title">
        <h1>{movieData?.movieInfo.title}</h1>
      </div>

      <div className="movie-sidebar">
        <img src={picPath} alt="" className="img-fluid rounded" />
        <div
          className={
            (movieData.type === "4K" ? "bg-dark" : "bg-primary") +
            " movie-type text-white p-2 mt-1 mb-1 rounded-3 d-flex justify-content-center"
          }
        >
          {movieData.type}
        </div>
        <div className="d-flex gap-1">
          <Button variant="danger" className="flex-fill">
            Delete
          </Button>
          <Button variant="info" className="flex-fill">
            Edit
          </Button>
        </div>
      </div>
      <div className="movie-details ps-3">
        <p>Premiere: {movieData.movieInfo.release_date}</p>
        <p>Overview: {movieData.movieInfo.overview}</p>
      </div>
    </div>
  );
}

export default MovieDetails;
