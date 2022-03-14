import axios from "axios";
import { ISearchTMDBResponse } from "./interfaces/ISearchTMBDResponse";
import { ItmdbMovie } from "./interfaces/ItmdbMovie";
const apiKey = process.env.REACT_APP_API_KEY;

const requests = {
  searchMovie: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=Avengers&page=1&include_adult=false`,
};

const searchMovie = async (title: string | undefined) => {
  if (title !== undefined) {
    const response: ISearchTMDBResponse = (
      await axios.get<ISearchTMDBResponse>(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pl-PL&query=${title}&page=1&include_adult=false`
      )
    ).data;
    console.log(response);
    return response.results;
  }
  return undefined;
};
export { searchMovie };