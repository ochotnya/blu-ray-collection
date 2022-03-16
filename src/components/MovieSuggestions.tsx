import React from "react";
import { Button, Card } from "react-bootstrap";
import { ItmdbMovie } from "../interfaces/ItmdbMovie";

import "./MoviesGrid.css";
interface IMovieSuggestions {
  movies: ItmdbMovie[];
  select: Function;
  selectedID: number | undefined;
}
function MovieSuggestions(props: IMovieSuggestions) {
  //list received movies or show "No suggestions"
  return (
    <div data-testid="MovieSuggestions">
      {props.movies.length > 0 ? (
        //list
        <div className="movies-grid">
          {props.movies.map((movie, idx) => {
            return (
              <Card
                key={idx}
                data-testid="movieCard"
                style={{ width: "12rem" }}
                className=" border-1 m-1"
              >
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                />
                <Card.Body>
                  <Card.Title style={{ fontSize: "1rem" }}>
                    {movie.title}
                  </Card.Title>
                  <Card.Subtitle
                    className="mb-2 text-muted"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {movie.release_date}
                  </Card.Subtitle>
                </Card.Body>
                <Button
                  variant={
                    props.selectedID === movie.id ? "success" : "secondary"
                  }
                  className="m-1"
                  onClick={() => props.select(movie)}
                >
                  {props.selectedID === movie.id ? "Selected" : "Select"}
                </Button>
                <div className="d-grid gap-2"></div>
              </Card>
            );
          })}
        </div>
      ) : (
        //no items
        <div className="d-flex justify-content-center mt-3 mb-3 text-muted">
          <h1>No suggestions</h1>
        </div>
      )}
    </div>
  );
}

export default MovieSuggestions;
