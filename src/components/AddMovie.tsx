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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title: string | undefined = titleRef.current?.value;
    const diskType: string | undefined = diskTypeRef.current?.value;
    const newDisk: IBluRay = {
      title: title,
      movieInfo: movieDetails,
      type: diskType,
    };

    writeToFirebase(newDisk);
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
        className="m-3"
        onSubmit={handleSubmit}
        style={{ maxWidth: "50rem" }}
      >
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control ref={titleRef} type="text" placeholder="Enter title" />

          <Button className="mt-1" onClick={search}>
            Search
          </Button>
          <MovieSuggestions movies={receivedMovies} select={setMovieDetails} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Disk type">
          <Form.Label>Disk type</Form.Label>
          <Form.Select ref={diskTypeRef}>
            <option>Blu-Ray</option>
            <option>4K</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddMovie;
