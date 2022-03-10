import React from "react";
import { Button, Card } from "react-bootstrap";
import { ItmdbMovie } from "../interfaces/ItmdbMovie";

interface IMovieSuggestions {
  movies: ItmdbMovie[];
  select: Function;
}
function MovieSuggestions(props: IMovieSuggestions) {
  return (
    <div className="d-flex p-2 flex-wrap">
      {props.movies.map((movie) => {
        return (
          <Card style={{ width: "15rem" }} className="m-2 border-3">
            <Card.Img
              variant="top"
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
            </Card.Body>
            <Button variant="secondary" onClick={() => props.select(movie)}>
              Select
            </Button>
          </Card>
        );
      })}
    </div>
  );
}

export default MovieSuggestions;
