import { ItmdbMovie } from "./ItmdbMovie";

export interface IBluRay {
  title: string;
  type: string; //blu-ray/4k
  movieInfo: ItmdbMovie; //info from TMDB
}
