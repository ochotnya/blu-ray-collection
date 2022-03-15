import { IFirestoreMovie } from "../interfaces/IFirestoreMovie";
import MovieItem from "./MovieItem";
import "./MoviesGrid.css";
interface IMyCollection {
  movies: IFirestoreMovie[];
}
function MyCollection(props: IMyCollection) {
  return (
    <div className="movies-grid">
      {props.movies.map((movie, index) => (
        <MovieItem details={movie} />
      ))}
    </div>
  );
}

export default MyCollection;
