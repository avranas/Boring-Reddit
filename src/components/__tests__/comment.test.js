import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import Comment from "../Comment";
import renderer from "react-test-renderer";

afterEach(() => {
  cleanup();
});

test("should render Comment component", () => {
  render(
    <table>
      <tbody>
        <Comment id={1} key={1} body={"Fake!"} ups={9001} author={"stretcc"} />
      </tbody>
    </table>
  );

  const commentElement = screen.getByTestId("comment-1");
  expect(commentElement).toBeInTheDocument();
  expect(commentElement).toHaveTextContent("Fake!");
  expect(commentElement).toHaveTextContent(9001);
  expect(commentElement).toHaveTextContent("stretcc");
});

test("matches snapshot", () => {
  const tree = renderer
    .create(
      <table>
        <tbody>
          <Comment
            id={1}
            key={1}
            body={"Fake!"}
            ups={9001}
            author={"stretcc"}
          />
        </tbody>
      </table>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
