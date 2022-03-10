import React from "react";
import { Button, Card } from "react-bootstrap";
import { ItmdbMovie } from "../interfaces/ItmdbMovie";

interface IMovieSuggestions {
  movies: ItmdbMovie[];
  select: Function;
  selectedID: number | undefined;
}
function MovieSuggestions(props: IMovieSuggestions) {
  return (
    <>
      {props.movies.length > 0 ? (
        <div className="d-flex mt-1 flex-wrap justify-content-between">
          {props.movies.map((movie) => {
            return (
              <Card style={{ width: "10rem" }} className=" border-1">
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
        <div className="d-flex justify-content-center mt-3 mb-3 text-muted">
          <h1>No suggestions</h1>
        </div>
      )}
    </>
  );
}

export default MovieSuggestions;
