import React, { useState } from "react";
import "./App.css";
import app from "./firebase";
import { ItmdbMovie } from "./interfaces/ItmdbMovie";
import { searchMovie } from "./requests";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore/lite";
import { db } from "./firebase";
import AddMovie from "./components/AddMovie";
function App() {
  const [receivedMovies, setReceivedMovies] = useState<ItmdbMovie[]>([]);
  const [title, setTitle] = useState("Batman");

  // const search = async () => {
  //   const list = await (await searchMovie("Avengers")).results;
  //   setReceivedMovies(list);
  //   console.log(list);
  // };

  const writeToFirebase = async () => {
    const newMovie = await doc(db, "movies/ugabufa3");
    collection(db, "movies");
    setDoc(newMovie, { title, disc: "opop" });
  };
  return (
    <div className="App">
      <AddMovie />
      {/* <button onClick={writeToFirebase}>Write to firebase</button>
      <button onClick={search}>Get data:</button>
      {receivedMovies.length > 0 &&
        receivedMovies.map((movie) => {
          return (
            <>
              <h1>{movie.title}</h1>
              <img
                width="50px"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt=""
              />
            </>
          );
        })} */}
    </div>
  );
}

export default App;
