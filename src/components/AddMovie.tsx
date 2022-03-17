import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { IBluRay } from "../interfaces/IBluRay";
import { ItmdbMovie } from "../interfaces/ItmdbMovie";
import { searchMovie } from "../requests";
import MovieSuggestions from "./MovieSuggestions";
import "./AddMovie.css";
import { useNavigate } from "react-router-dom";
import { addMovie } from "../utils/DBfunctions";

function AddMovie() {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieType, setMovieType] = useState("Blu-ray");
  const [receivedMovies, setReceivedMovies] = useState<ItmdbMovie[]>([]);
  const [movieDetails, setMovieDetails] = useState<ItmdbMovie>();
  const navigate = useNavigate();

  const changeMovieType = (e: ChangeEvent<HTMLInputElement>) => {
    setMovieType(e.target.value);
  };

  const changeMovieTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setMovieTitle(e.target.value);
    console.log(e.target.value);
  };

  //add movie and go to home page if there are no errors
  const handleSubmit = async () => {
    if (movieDetails !== undefined) {
      const newDisk: IBluRay = {
        title: movieTitle,
        movieInfo: movieDetails,
        type: movieType,
      };
      if (await addMovie(newDisk)) {
        navigate(`/`);
      }
    }
  };

  const search = async () => {
    if (movieTitle !== "") {
      const list = await searchMovie(movieTitle);
      if (list !== undefined) setReceivedMovies(list);
    }
  };

  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search();
  };

  return (
    <div>
      <div className="add-movie-container">
        <Form onSubmit={handleSubmitSearch} className="search-bar">
          <Form.Control
            className="disk-type"
            as="select"
            value={movieType}
            onChange={changeMovieType}
          >
            <option>Blu-Ray</option>
            <option>4K</option>
          </Form.Control>

          <Form.Control
            className="title"
            value={movieTitle}
            type="text"
            placeholder="Enter title"
            onChange={changeMovieTitle}
          />

          <Button size="lg" className="search" onClick={search}>
            Search
          </Button>
          <Button
            className="submit"
            name="submitButton"
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            disabled={movieDetails === undefined}
          >
            Submit
          </Button>
        </Form>
        <MovieSuggestions
          movies={receivedMovies}
          select={setMovieDetails}
          selectedID={movieDetails?.id}
        />
      </div>
    </div>
  );
}

export default AddMovie;
