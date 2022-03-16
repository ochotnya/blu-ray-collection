import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IBluRay } from "../interfaces/IBluRay";
import { deleteMovie } from "../utils/DBfunctions";
import ConfirmationPopup from "./ConfirmationPopup";
import "./MovieDetails.css";
interface IMovieDetails {
  data: IBluRay;
  id: string;
}
function MovieDetails(props: IMovieDetails) {
  const [showPopup, setShowPopup] = useState(false);
  const movieData = props.data;
  const navigate = useNavigate();

  //try to remove item, close popup and return to home page
  const handleConfirm = async () => {
    await deleteMovie(props.id);
    setShowPopup(false);
    navigate(`/`);
  };

  const picPath =
    movieData.movieInfo.poster_path === null
      ? "https://aimint.org/ap/wp-content/uploads/sites/18/2016/04/image-placeholder-vertical.jpg"
      : `https://image.tmdb.org/t/p/original/${movieData.movieInfo.poster_path}`;
  return (
    <>
      <ConfirmationPopup
        handleNo={() => setShowPopup(false)}
        handleYes={handleConfirm}
        variantYes="danger"
        headerText="Delete item"
        text="Are you sure you want to delete this movie from your collection?"
        show={showPopup}
        onHide={() => setShowPopup(false)}
      />

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
            <Button
              variant="danger"
              className="flex-fill"
              onClick={() => setShowPopup(true)}
            >
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
    </>
  );
}

export default MovieDetails;
