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

function Home() {
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
        <Form className="m-1">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search my collection..."
            ></Form.Control>
          </Form.Group>
        </Form>
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
