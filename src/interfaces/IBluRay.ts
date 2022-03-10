import { ItmdbMovie } from "./ItmdbMovie";

export interface IBluRay {
  title: string | undefined;
  type: string | undefined; //blu-ray/4k
  movieInfo: ItmdbMovie | undefined;
}
