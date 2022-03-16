import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IFirestoreMovie } from "../../interfaces/IFirestoreMovie";
import { getMovie } from "../../utils/DBfunctions";
import ConfirmationPopup from "../ConfirmationPopup";
import MovieDetails from "../MovieDetails";
import NavigationBar from "../NavigationBar";

function PageMovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<IFirestoreMovie>();
  const [showPopup, setShowPopup] = useState(false);
  const handleConfirm = () => {
    setShowPopup(false);
  };
  const loadData = async () => {
    if (movieId !== undefined) setMovie(await getMovie(movieId));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <NavigationBar />
      <ConfirmationPopup
        handleNo={handleConfirm}
        handleYes={handleConfirm}
        variantYes="danger"
        headerText="Delete item"
        text="Are you sure you want to delete this movie from your collection?"
        show={showPopup}
        onHide={() => setShowPopup(false)}
      />
      <div className="d-flex justify-content-center align-items-center">
        {movie !== undefined ? (
          <MovieDetails data={movie?.data} id={movie?.id} />
        ) : (
          <p>brak</p>
        )}
      </div>
    </div>
  );
}

export default PageMovieDetails;
