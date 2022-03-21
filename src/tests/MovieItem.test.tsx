import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import MovieItem from "../components/MovieItem";
import { IFirestoreMovie } from "../interfaces/IFirestoreMovie";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

test("Check if disk type is displayed properly [Blu-ray]", () => {
  const testMovie: IFirestoreMovie = {
    id: "B8lKopFm2xwqzbQa9bEM",
    data: {
      movieInfo: {
        adult: false,
        backdrop_path: "/cyecB7godJ6kNHGONFjUyVN9OX5.jpg",
        genre_ids: [28, 878, 12],
        id: 1726,
        original_language: "en",
        original_title: "Iron Man",
        overview:
          '"Iron Man" to historia miliardera, przemysłowca i genialnego wynalazcy Tony’ego Starka (Robert Downey Jr.), szefa Stark Industries, głównego dostawcy broni dla rządu USA. Beztroski styl życia Tony’ego zmienia się na zawsze, kiedy po testach przeprowadzanych z nową bronią, jego konwój zostaje zaatakowany, a on sam porwany przez rebeliantów. Ranny od pocisku, który utkwił w pobliżu serca, Tony zostaje zmuszony do skonstruowania potężnej broni dla Razy (Faran Tahir), tajemniczego przywódcy rebeliantów. Nie zważając jednak na żądania porywaczy, Tony wykorzystuje swój intelekt i geniusz, aby skonstruować zbroję, która utrzyma go przy życiu i pomoże w ucieczce.',
        popularity: 107.313,
        poster_path: "/75CyGj7XjM3duSh0ykuX9v4GtMD.jpg",
        release_date: "2008-04-30",
        title: "Iron Man",
        video: false,
        vote_average: 7.6,
        vote_count: 22340,
      },
      title: "logan",
      type: "Blu-ray",
    },
  };
  render(<MovieItem details={testMovie} />);
  const movieHeader = screen.getByTestId("cardHeader");
  expect(movieHeader).toHaveClass("bg-primary");
  expect(movieHeader).toHaveTextContent("Blu-ray");
});

test("Check if disk type is displayed properly [4K]", () => {
  const testMovie: IFirestoreMovie = {
    id: "B8lKopFm2xwqzbQa9bEM",
    data: {
      movieInfo: {
        adult: false,
        backdrop_path: "/cyecB7godJ6kNHGONFjUyVN9OX5.jpg",
        genre_ids: [28, 878, 12],
        id: 1726,
        original_language: "en",
        original_title: "Iron Man",
        overview:
          '"Iron Man" to historia miliardera, przemysłowca i genialnego wynalazcy Tony’ego Starka (Robert Downey Jr.), szefa Stark Industries, głównego dostawcy broni dla rządu USA. Beztroski styl życia Tony’ego zmienia się na zawsze, kiedy po testach przeprowadzanych z nową bronią, jego konwój zostaje zaatakowany, a on sam porwany przez rebeliantów. Ranny od pocisku, który utkwił w pobliżu serca, Tony zostaje zmuszony do skonstruowania potężnej broni dla Razy (Faran Tahir), tajemniczego przywódcy rebeliantów. Nie zważając jednak na żądania porywaczy, Tony wykorzystuje swój intelekt i geniusz, aby skonstruować zbroję, która utrzyma go przy życiu i pomoże w ucieczce.',
        popularity: 107.313,
        poster_path: "/75CyGj7XjM3duSh0ykuX9v4GtMD.jpg",
        release_date: "2008-04-30",
        title: "Iron Man",
        video: false,
        vote_average: 7.6,
        vote_count: 22340,
      },
      title: "logan",
      type: "4K",
    },
  };
  render(<MovieItem details={testMovie} />);
  const movieHeader = screen.getByTestId("cardHeader");
  expect(movieHeader).toHaveClass("bg-dark");
  expect(movieHeader).toHaveTextContent("4K");
});

test("Check if movie title is displayed properly", () => {
  const testMovie: IFirestoreMovie = {
    id: "B8lKopFm2xwqzbQa9bEM",
    data: {
      movieInfo: {
        adult: false,
        backdrop_path: "/cyecB7godJ6kNHGONFjUyVN9OX5.jpg",
        genre_ids: [28, 878, 12],
        id: 1726,
        original_language: "en",
        original_title: "Iron Man",
        overview:
          '"Iron Man" to historia miliardera, przemysłowca i genialnego wynalazcy Tony’ego Starka (Robert Downey Jr.), szefa Stark Industries, głównego dostawcy broni dla rządu USA. Beztroski styl życia Tony’ego zmienia się na zawsze, kiedy po testach przeprowadzanych z nową bronią, jego konwój zostaje zaatakowany, a on sam porwany przez rebeliantów. Ranny od pocisku, który utkwił w pobliżu serca, Tony zostaje zmuszony do skonstruowania potężnej broni dla Razy (Faran Tahir), tajemniczego przywódcy rebeliantów. Nie zważając jednak na żądania porywaczy, Tony wykorzystuje swój intelekt i geniusz, aby skonstruować zbroję, która utrzyma go przy życiu i pomoże w ucieczce.',
        popularity: 107.313,
        poster_path: "/75CyGj7XjM3duSh0ykuX9v4GtMD.jpg",
        release_date: "2008-04-30",
        title: "Iron Man",
        video: false,
        vote_average: 7.6,
        vote_count: 22340,
      },
      title: "logan",
      type: "4K",
    },
  };
  render(<MovieItem details={testMovie} />);
  const movieHeader = screen.getByTestId("cardTitle");
  expect(movieHeader).toHaveTextContent("Iron Man");
});
