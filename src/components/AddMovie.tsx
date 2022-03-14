import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { IBluRay } from "../interfaces/IBluRay";
import { ItmdbMovie } from "../interfaces/ItmdbMovie";
import { collection, addDoc } from "firebase/firestore/lite";
import { db } from "../firebase";
import { searchMovie } from "../requests";
import MovieSuggestions from "./MovieSuggestions";

function AddMovie() {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieType, setMovieType] = useState("Blu-ray");
  const [receivedMovies, setReceivedMovies] = useState<ItmdbMovie[]>([]);
  const [movieDetails, setMovieDetails] = useState<ItmdbMovie>();

  const changeMovieType = (e: ChangeEvent<HTMLInputElement>) => {
    setMovieType(e.target.value);
  };

  const changeMovieTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setMovieTitle(e.target.value);
    console.log(e.target.value);
  };
  const handleSubmit = () => {
    if (movieDetails !== undefined) {
      const newDisk: IBluRay = {
        title: movieTitle,
        movieInfo: movieDetails,
        type: movieType,
      };
      writeToFirebase(newDisk);
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

  const writeToFirebase = async (diskInfo: IBluRay) => {
    const collectionRef = collection(db, "movies");
    addDoc(collectionRef, diskInfo);
  };
  return (
    <div>
      <Form
        onSubmit={handleSubmitSearch}
        className="m-3"
        style={{ maxWidth: "45rem" }}
      >
        <Form.Group className="mb-3" controlId="Disk type">
          <Form.Label>Disk type</Form.Label>
          <Form.Control
            as="select"
            value={movieType}
            onChange={changeMovieType}
          >
            <option>Blu-Ray</option>
            <option>4K</option>
          </Form.Control>
        </Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={movieTitle}
          type="text"
          placeholder="Enter title"
          onChange={changeMovieTitle}
        />
        <div className="d-grid gap-2">
          <Button className="mt-1" onClick={search}>
            Search
          </Button>
        </div>
        <MovieSuggestions
          movies={receivedMovies}
          select={setMovieDetails}
          selectedID={movieDetails?.id}
        />
        <div className="d-grid gap-2">
          <Button
            name="submitButton"
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            disabled={movieDetails === undefined}
          >
            Submit
          </Button>
          <Button variant="danger" size="lg">
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddMovie;
