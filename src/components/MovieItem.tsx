import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./Card.css";
import { IFirestoreMovie } from "../interfaces/IFirestoreMovie";
interface IMovieItem {
  details: IFirestoreMovie;
}
function MovieItem(props: IMovieItem) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/moviedetails/${props.details.id}`);
  };

  const picPath =
    props.details.data.movieInfo.poster_path === null
      ? "https://aimint.org/ap/wp-content/uploads/sites/18/2016/04/image-placeholder-vertical.jpg"
      : `https://image.tmdb.org/t/p/original/${props.details.data.movieInfo.poster_path}`;

  return (
    <Card
      border={props.details.data.type === "4K" ? "dark" : "primary"}
      className="m-1 movie-card"
      data-mdb-ripple-color="light"
      onClick={handleClick}
    >
      <Card.Header
        className={
          props.details.data.type === "4K"
            ? "bg-dark text-white"
            : "bg-primary text-white"
        }
      >
        {props.details.data.type}
      </Card.Header>
      <Card.Img variant="bottom" src={picPath} />
      <Card.Body>{props.details.data.movieInfo.title}</Card.Body>
    </Card>
  );
}

export default MovieItem;
