import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { onValue, ref, getDatabase } from "firebase/database";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Button, Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import { ItmdbMovie } from "../../interfaces/ItmdbMovie";
import { IBluRay } from "../../interfaces/IBluRay";
import NavigationBar from "../NavigationBar";

function Home() {
  const [myMovies, setmyMovies] = useState<IBluRay[]>([]);
  const getData = async () => {
    const querySnapshot = await getDocs(collection(getFirestore(), "movies"));

    const result: IBluRay[] = [];
    querySnapshot.docs.forEach((doc) => {
      result.push(doc.data() as IBluRay);
    });

    return result;
  };

  return (
    <div>
      <NavigationBar />
      <Button onClick={async () => setmyMovies(await getData())}>get</Button>
      {myMovies.map((movie) => (
        <h1>{movie.title}</h1>
      ))}
    </div>
  );
}

export default Home;
