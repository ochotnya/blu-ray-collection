import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IBluRay } from "../interfaces/IBluRay";
import MovieItem from "./MovieItem";
import "./MoviesGrid.css";
interface IMyCollection {
  movies: IBluRay[];
}
function MyCollection(props: IMyCollection) {
  return (
    <div className="movies-grid">
      {props.movies.map((movie, index) => (
        <MovieItem details={movie} />
      ))}
      {/* <Container fluid style={{ background: "red" }}>
        <Row>
          {props.movies.map((movie, index) => (
            <Col className="col-1 m-2">
              <MovieItem details={movie} />
            </Col>
          ))}
        </Row>
      </Container> */}
    </div>
  );
}

export default MyCollection;
