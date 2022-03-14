import React from "react";
import { Card } from "react-bootstrap";
import { IBluRay } from "../interfaces/IBluRay";
import "./Card.css";
interface IMovieItem {
  details: IBluRay;
}
function MovieItem(props: IMovieItem) {
  const picPath =
    props.details.movieInfo.poster_path === null
      ? "https://aimint.org/ap/wp-content/uploads/sites/18/2016/04/image-placeholder-vertical.jpg"
      : `https://image.tmdb.org/t/p/original/${props.details.movieInfo.poster_path}`;
  return (
    <Card
      border={props.details.type === "4K" ? "dark" : "primary"}
      className="m-1 movie-card"
      data-mdb-ripple-color="light"
      //   style={{ width: "10rem", height: "22rem" }}
    >
      <Card.Header
        className={
          props.details.type === "4K"
            ? "bg-dark text-white"
            : "bg-primary text-white"
        }
      >
        {props.details.type}
      </Card.Header>
      <Card.Img variant="bottom" src={picPath} />
      <Card.Body>{props.details.movieInfo.title}</Card.Body>
    </Card>
  );
}

export default MovieItem;
