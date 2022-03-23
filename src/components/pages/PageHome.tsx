import React, { useEffect, useState } from "react";

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
  const [myMovies, setmyMovies] = useState<IFirestoreMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    setBluRayCount(
      myMovies.filter((item) => item.data.type == "Blu-ray").length
    );

    setUHDCount(myMovies.filter((item) => item.data.type == "4K").length);
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
        <Form className="m-1 mb-4">
          <Form.Group>
            <Form.Control
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
        {!isLoading && <MyCollection movies={myMovies} />}
      </div>
    </div>
  );
}

export default Home;
