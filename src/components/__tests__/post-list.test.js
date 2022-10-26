import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PostList from '../PostList';
import { Provider } from 'react-redux';
import store from '../../store';
import renderer from 'react-test-renderer';

afterEach(() => {
  cleanup();
});

const postList = <Provider store={store}><BrowserRouter><PostList/></BrowserRouter></Provider>;

test('should render PostList component', () => {
  render(postList);
  const postListElement = screen.getByTestId('post-list');
  expect(postListElement).toBeInTheDocument();
})

test('PostList matches snapshot', () => {
  const tree = renderer.create(postList).toJSON();
  expect(tree).toMatchSnapshot();
});
