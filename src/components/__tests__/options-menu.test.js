import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import OptionsMenu from '../OptionsMenu';
import { Provider } from 'react-redux';
import store from '../../store';
import renderer from 'react-test-renderer';

afterEach(() => {
  cleanup();
});

//const searchBar = <Provider store={store}><BrowserRouter><SearchBar/></BrowserRouter></Provider>;
const optionsMenu = <Provider store={store}><OptionsMenu/></Provider>;

test('should render OptionsMenu component', () => {
  render(optionsMenu);
  const optionsMenuElement = screen.getByTestId('options-menu');
  expect(optionsMenuElement).toBeInTheDocument();
})

test('OptionsMenu matches snapshot', () => {
  const tree = renderer.create(optionsMenu).toJSON();
  expect(tree).toMatchSnapshot();
});
