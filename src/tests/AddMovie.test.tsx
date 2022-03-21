import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddMovie from "../components/AddMovie";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import axios from "axios";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

let movies: any[] | PromiseLike<any[]> = [];
beforeEach(() => {
  jest.resetAllMocks();
  movies = [
    {
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
  ];
});

jest.mock("axios");
test("Check suggestions right after loading component", () => {
  render(<AddMovie />);
  const suggestions = screen.getByText("No suggestions");
  expect(suggestions).toBeInTheDocument();
});

test("Check if submit button is disabled", () => {
  render(<AddMovie />);
  const submitButton = screen.getByText("Submit");
  expect(submitButton).toBeDisabled();
});

test("Find movie", async () => {
  const mock = jest.spyOn(axios, "get");
  const apiResult = {
    data: { results: movies },
  };
  mock.mockReturnValueOnce(Promise.resolve(apiResult));
  render(<AddMovie />);

  const searchField = screen.getByPlaceholderText("Enter title");
  userEvent.type(searchField, "iron man");
  fireEvent.submit(searchField);

  await waitFor(() => {
    expect(mock).toBeCalledTimes(1);
  });

  const suggestion = await screen.findByTestId("movieCard");

  expect(suggestion).toHaveTextContent("Iron Man");
});

test("Check if submit button is enabled after selecting a movie", async () => {
  const mock = jest.spyOn(axios, "get");
  const apiResult = {
    data: { results: movies },
  };
  mock.mockReturnValueOnce(Promise.resolve(apiResult));
  render(<AddMovie />);

  const searchField = screen.getByPlaceholderText("Enter title");
  userEvent.type(searchField, "iron man");
  fireEvent.submit(searchField);

  await waitFor(() => {
    expect(mock).toBeCalledTimes(1);
  });
  const selectButton = screen.getByText("Select");
  userEvent.click(selectButton);
  const submitButton = screen.getByText("Submit");
  expect(submitButton).toBeEnabled();
});
