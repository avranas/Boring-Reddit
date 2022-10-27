import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import OptionsMenu from "../OptionsMenu";
import { Provider } from "react-redux";
import store from "../../store";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  cleanup();
});

//const searchBar = <Provider store={store}><BrowserRouter><SearchBar/></BrowserRouter></Provider>;
const optionsMenu = (
  <Provider store={store}>
    <OptionsMenu />
  </Provider>
);

test("should render OptionsMenu component", () => {
  render(optionsMenu);
  const optionsMenuElement = screen.getByTestId("options-menu");
  expect(optionsMenuElement).toBeInTheDocument();
});

test("OptionsMenu matches closed snapshot", () => {
  const tree = renderer.create(optionsMenu).toJSON();
  expect(tree).toMatchSnapshot();
});

test("OptionsMenu matches open snapshot", () => {
  render(optionsMenu);
  const optionsMenuButton = screen.getByTestId("options-menu-button");
  userEvent.click(optionsMenuButton);
  const tree = renderer.create(optionsMenu).toJSON();
  expect(tree).toMatchSnapshot();
});

test("User clicks on the options menu, then changes thread count and clicks both switches", async () => {
  const beforeOptions = store.getState().options.options;
  const testInput = "22";
  render(optionsMenu);
  const optionsMenuButton = screen.getByTestId("options-menu-button");
  userEvent.click(optionsMenuButton);
  const threadLimitInput = screen.getByTestId("thread-limit-input");
  userEvent.type(threadLimitInput, testInput);
  const commentSwitch = screen.getByTestId("comment-switch");
  userEvent.click(commentSwitch);
  const nsfwSwitch = screen.getByTestId("nsfw-switch");
  userEvent.click(nsfwSwitch);
  const afterOptions = store.getState().options.options;
  expect(beforeOptions.threadLimit).toBe(null);
  expect(afterOptions.threadLimit).toBe(Number(testInput));
  expect(beforeOptions.hideNSFW).toBe(false);
  expect(afterOptions.hideNSFW).toBe(true);
  expect(beforeOptions.commentsOn).toBe(false);
  expect(afterOptions.commentsOn).toBe(true);
  expect(optionsMenu);
});
