import { ItmdbMovie } from "./ItmdbMovie";

export interface ISearchTMDBResponse {
  page: number;
  results: ItmdbMovie[];
  total_pages: number;
  total_results: number;
}
