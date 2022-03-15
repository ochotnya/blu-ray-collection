import React, { useEffect, useState } from "react";

import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Form } from "react-bootstrap";

import { IBluRay } from "../../interfaces/IBluRay";
import NavigationBar from "../NavigationBar";
import MyCollection from "../MyCollection";
import { IFirestoreMovie } from "../../interfaces/IFirestoreMovie";

function Home() {
  const [myMovies, setmyMovies] = useState<IFirestoreMovie[]>([]);
  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(getFirestore(), "movies"));

      const result: IFirestoreMovie[] = [];
      querySnapshot.docs.forEach((doc) => {
        const item: IFirestoreMovie = {
          id: doc.id,
          data: doc.data() as IBluRay,
        };
        result.push(item);
      });

      return result;
    } catch (error) {
      return [];
    }
  };

  const loadMyMovies = async () => {
    setmyMovies(await getData());
  };
  useEffect(() => {
    loadMyMovies();
  }, []);

  return (
    <div>
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
        <MyCollection movies={myMovies} />
      </div>
    </div>
  );
}

export default Home;
