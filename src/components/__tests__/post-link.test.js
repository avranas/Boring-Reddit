import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PostLink from '../PostLink';
import { Provider } from 'react-redux';
import store from '../../store';
import renderer from 'react-test-renderer';

afterEach(() => {
  cleanup();
});

//I will need to replace this with another reddit post if this gets removed.
const props = {
}

const postLink = 
  <Provider store={store}>
    <BrowserRouter>
      <table>
        <tbody>
          <PostLink 
            key={1}
            id={1}
            title={"This is a post on Reddit"}
            redditUrl={'https://www.reddit.com/r/tifu/comments/x35iu6/tifu_my_20f_girlfriend_of_two_years_told_me_the/'}
            nsfw={false}
            author={'TylerLife'}
            ups={170000}
          />
        </tbody>
      </table>
    </BrowserRouter>
  </Provider>;

test('should render PostLink component', () => {
  render(postLink);

    //TODO: WHY?
  const postLinkElement = screen.getByTestId('post-link-1');
  expect(postLinkElement).toBeInTheDocument();
  expect(postLinkElement).toHaveTextContent(170000);
  expect(postLinkElement).toHaveTextContent('TylerLife');
})

test('PostLink matches snapshot', () => {
  const tree = renderer.create(postLink).toJSON();
  expect(tree).toMatchSnapshot();
});
