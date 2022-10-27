import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar";
import PostList from "../PostList";
import { Provider } from "react-redux";
import store from "../../store";
import renderer from "react-test-renderer";

//This is probably what I want
import userEvent from "@testing-library/user-event";
//npm install --save-dev @testing-library/user-event@12.0.4

afterEach(() => {
  cleanup();
});

const searchBar = (
  <Provider store={store}>
    <BrowserRouter>
      <SearchBar />
    </BrowserRouter>
  </Provider>
);

test("should render SearchBar component", () => {
  render(searchBar);
  const searchBarElement = screen.getByTestId("searchbar");
  expect(searchBarElement).toBeInTheDocument();
});

test("SearchBar matches snapshot", () => {
  const tree = renderer.create(searchBar).toJSON();
  expect(tree).toMatchSnapshot();
});

test("User types'baseball' into searchbar, clicks 'Search', and is navigated to '/search-results/?search=baseball'", async () => {
  //Get the searchbar
  render(searchBar);
  const searchBarElement = screen.getByRole("searchbox");
  userEvent.type(searchBarElement, "baseball");
  const buttonElement = screen.getByTestId("searchbar-button");
  userEvent.click(buttonElement);
  expect(window.location.pathname).toBe("/search-results");
  expect(window.location.search).toBe("?search=baseball");
});
