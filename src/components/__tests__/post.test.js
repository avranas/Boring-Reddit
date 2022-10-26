import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Post from '../Post';
import { Provider } from 'react-redux';
import store from '../../store';
import renderer from 'react-test-renderer';

afterEach(() => {
  cleanup();
});

//I will need to replace this with another reddit post if this gets removed.
const postUrl = 'https://www.reddit.com/r/tifu/comments/x35iu6/tifu_my_20f_girlfriend_of_two_years_told_me_the/';

const post = <Provider store={store}><BrowserRouter><Post redditUrl={postUrl}/></BrowserRouter></Provider>;

test('should render Post component', () => {
  render(post);
  const postElement = screen.getByTestId('post');
  expect(postElement).toBeInTheDocument();
})

test('Post matches snapshot', () => {
  const tree = renderer.create(post).toJSON();
  expect(tree).toMatchSnapshot();
});
