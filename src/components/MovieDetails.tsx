import React, { ChangeEvent } from "react";
import { Button } from "react-bootstrap";
import { IFirestoreMovie } from "../interfaces/IFirestoreMovie";
import "./MovieDetails.css";

interface IMovieDetails {
  movie: IFirestoreMovie;
  deleteEvent: () => void;
  changeTypeEvent: (e: ChangeEvent<HTMLSelectElement>) => void;
}
function MovieDetails(props: IMovieDetails) {
  const movieData = props.movie.data;

  const picPath =
    movieData.movieInfo.poster_path === null
      ? "https://aimint.org/ap/wp-content/uploads/sites/18/2016/04/image-placeholder-vertical.jpg"
      : `https://image.tmdb.org/t/p/original/${movieData.movieInfo.poster_path}`;
  return (
    <>
      <div className="movie-details-container shadow-lg rounded p-2">
        <div className="movie-title">
          <h1>{movieData?.movieInfo.title}</h1>
        </div>

        <div className="movie-sidebar">
          <img src={picPath} alt="" className="img-fluid rounded" />
          <select
            value={props.movie.data.type}
            onChange={props.changeTypeEvent}
            className={
              (props.movie.data.type === "4K" ? "bg-dark" : "bg-primary") +
              " movie-type text-white p-2 mt-1 mb-1 rounded-3 d-flex justify-content-center w-100"
            }
          >
            <option>Blu-ray</option>
            <option>4K</option>
          </select>
          <div className="d-flex gap-1">
            <Button
              variant="danger"
              className="flex-fill"
              onClick={props.deleteEvent}
            >
              Delete
            </Button>{" "}
          </div>
        </div>
        <div className="movie-details ps-3">
          <p>Premiere: {movieData.movieInfo.release_date}</p>
          <p>Overview: {movieData.movieInfo.overview}</p>
        </div>
      </div>
    </>
  );
}

export default MovieDetails;
