import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import { Form } from "react-bootstrap";
import { IBluRay } from "../../interfaces/IBluRay";
import NavigationBar from "../NavigationBar";
import MyCollection from "../MyCollection";
import { IFirestoreMovie } from "../../interfaces/IFirestoreMovie";
import Counter from "../Counter";

function Home() {
  const [moviesCount, setMoviesCount] = useState(0);
  const [bluRayCount, setBluRayCount] = useState(0);
  const [UHDCount, setUHDCount] = useState(0);
  const [phrase, setPhrase] = useState("");
  const [myMovies, setmyMovies] = useState<IFirestoreMovie[]>([]);
  const [moviesToShow, setMoviesToShow] = useState<IFirestoreMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const updatePhrase = (e: ChangeEvent<HTMLInputElement>) => {
    setPhrase(e.target.value);
  };

  //set list according to the filter phrase. If the phrase is empty, it sets all movies
  const searchMovie = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filteredMovies = myMovies.filter((item) =>
      item.data.movieInfo.title.includes(phrase)
    );
    setMoviesToShow(filteredMovies);
  };

  //load movies and subscribe to changes
  useEffect(() => {
    setmyMovies([]);
    const q = query(collection(getFirestore(), "movies"));
    let result: IFirestoreMovie[] = [];

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        const item: IFirestoreMovie = {
          id: doc.id,
          data: doc.data() as IBluRay,
        };
        result.push(item);
      });
      setmyMovies(result);
      setMoviesToShow(result);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  //update counters
  useEffect(() => {
    setBluRayCount(
      myMovies.filter((item) => item.data.type === "Blu-ray").length
    );
    setUHDCount(myMovies.filter((item) => item.data.type === "4K").length);
    setMoviesCount(myMovies.length);
  }, [myMovies]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <NavigationBar />

      <div className="m-4">
        <Form className="m-1 mb-4" onSubmit={searchMovie}>
          <Form.Group>
            <Form.Control
              onChange={updatePhrase}
              type="text"
              placeholder="Search my collection..."
            ></Form.Control>
          </Form.Group>
        </Form>
        <div className="d-flex">
          <Counter
            text="All"
            textColor="text-white"
            bgColor="bg-success"
            count={moviesCount}
          />
          <Counter
            text="Blu-ray"
            textColor="text-white"
            bgColor="bg-primary"
            count={bluRayCount}
          />
          <Counter
            text="4K"
            textColor="text-white"
            bgColor="bg-dark"
            count={UHDCount}
          />
        </div>

        {isLoading && (
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border" />
          </div>
        )}
        {!isLoading && <MyCollection movies={moviesToShow} />}
      </div>
    </div>
  );
}

export default Home;
