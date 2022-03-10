import React, { FormEvent, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { IBluRay } from "../interfaces/IBluRay";
import { ItmdbMovie } from "../interfaces/ItmdbMovie";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  addDoc,
} from "firebase/firestore/lite";
import { db } from "../firebase";
import { searchMovie } from "../requests";
import MovieSuggestions from "./MovieSuggestions";

function AddMovie() {
  const titleRef = useRef<HTMLInputElement>(null);
  const diskTypeRef = useRef<HTMLSelectElement>(null);
  const [receivedMovies, setReceivedMovies] = useState<ItmdbMovie[]>([]);
  const [movieDetails, setMovieDetails] = useState<ItmdbMovie>();

  const handleSubmit = () => {
    const title: string | undefined = titleRef.current?.value;
    const diskType: string | undefined = diskTypeRef.current?.value;
    const newDisk: IBluRay = {
      title: title,
      movieInfo: movieDetails,
      type: diskType,
    };

    writeToFirebase(newDisk);
  };

  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search();
  };
  const search = async () => {
    const title = titleRef.current?.value;
    if (title !== "") {
      const list = await searchMovie(title);
      if (list !== undefined) setReceivedMovies(list);
    }
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
          <Form.Select ref={diskTypeRef}>
            <option>Blu-Ray</option>
            <option>4K</option>
          </Form.Select>
        </Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control ref={titleRef} type="text" placeholder="Enter title" />
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
