import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import CommentList from "../CommentList";
import { Provider } from "react-redux";
import store from "../../store";
import renderer from "react-test-renderer";

const comments = [
  {
    id: 1,
    key: 1,
    body: "Fake!",
    ups: 9001,
    author: "stretcc",
  },
  {
    id: 2,
    key: 2,
    body: "Cool story, bro",
    ups: 1337,
    author: "stretcc",
  },
  {
    id: 3,
    key: 3,
    body: "u mad?",
    ups: -2,
    author: "mean_troll42",
  },
];

afterEach(() => {
  cleanup();
});

const commentList = (
  <Provider store={store}>
    <BrowserRouter>
      <CommentList comments={comments} />
    </BrowserRouter>
  </Provider>
);

test("should render CommentList component", () => {
  render(commentList);
  const commentListElement = screen.getByTestId("comment-list");
  expect(commentListElement).toBeInTheDocument();
});

test("CommentList matches snapshot", () => {
  const tree = renderer.create(commentList).toJSON();
  expect(tree).toMatchSnapshot();
});
