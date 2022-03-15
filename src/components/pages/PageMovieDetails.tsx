import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IBluRay } from "../../interfaces/IBluRay";
import { IFirestoreMovie } from "../../interfaces/IFirestoreMovie";
import MovieDetails from "../MovieDetails";
import NavigationBar from "../NavigationBar";

function PageMovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<IFirestoreMovie>();

  const loadData = async () => {
    setMovie(await getData());
  };

  const getData = async () => {
    try {
      const querySnapshot = await doc(
        collection(getFirestore(), `movies`),
        movieId
      );
      const mydoc = await getDoc(querySnapshot);
      const item: IFirestoreMovie = {
        id: mydoc.id,
        data: mydoc.data() as IBluRay,
      };
      return item;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <NavigationBar />
      <div className="d-flex justify-content-center align-items-center">
        {movie !== undefined ? (
          <MovieDetails data={movie?.data} />
        ) : (
          <p>brak</p>
        )}
      </div>
    </div>
  );
}

export default PageMovieDetails;
