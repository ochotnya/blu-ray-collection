import React from "react";
import { useParams } from "react-router-dom";
function PageMovieDetails() {
  const { movieId } = useParams();
  return <div>PageMovieDetails {movieId}</div>;
}

export default PageMovieDetails;
