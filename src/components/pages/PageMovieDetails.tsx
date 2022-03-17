import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IBluRay } from "../../interfaces/IBluRay";
import { IFirestoreMovie } from "../../interfaces/IFirestoreMovie";
import { deleteMovie, updateMovie } from "../../utils/DBfunctions";
import ConfirmationPopup from "../ConfirmationPopup";
import MovieDetails from "../MovieDetails";
import NavigationBar from "../NavigationBar";

function PageMovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<IFirestoreMovie>();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = async () => {
    if (movieId !== undefined) {
      navigate(`/`); //First go back to the home page. This will prevent downloading non existing data
      await deleteMovie(movieId);
    }
  };

  const changeType = async (e: ChangeEvent<HTMLSelectElement>) => {
    if (movieId !== undefined) await updateMovie(movieId, e.target.value);
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(collection(getFirestore(), `movies`), movieId),
      async (doc) => {
        const item: IFirestoreMovie = {
          id: doc.id,
          data: doc.data() as IBluRay,
        };
        setMovie(item);
        console.log("witam");
      }
    );
    return unsubscribe;
  }, [movieId, setMovie]);

  return (
    <div>
      <NavigationBar />
      <ConfirmationPopup
        handleNo={() => setShowPopup(false)}
        handleYes={handleConfirm}
        variantYes="danger"
        headerText="Delete item"
        text="Are you sure you want to delete this movie from your collection?"
        show={showPopup}
        onHide={() => setShowPopup(false)}
      />
      <div className="d-flex justify-content-center align-items-center">
        {movie !== undefined ? (
          <MovieDetails
            movie={movie}
            deleteEvent={() => setShowPopup(true)}
            changeTypeEvent={changeType}
          />
        ) : (
          <p>brak</p>
        )}
      </div>
    </div>
  );
}

export default PageMovieDetails;
