import PostLink from './PostLink';
import { useSelector } from "react-redux";
import { selectSearchResults } from '../slices/searchResultsSlice';
import { selectOptions } from '../slices/optionsSlice';
import { useDispatch } from "react-redux";
import { getSearchResults } from "../slices/searchResultsSlice";
import { useEffect } from 'react';

const PostList = ({searchParams}) => {
  
  const searchResults = useSelector(selectSearchResults);
  const options = useSelector(selectOptions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearchResults(searchParams));
  }, [dispatch, searchParams]);

  return (
    <div className="post-list container">
      { searchResults.isLoading && <h3>Loading...</h3> }
      { searchResults.hasError && <h2>Subreddit not found :( Try a different search term!</h2> }
      { !searchResults.hasError && !searchResults.isLoading && <h2>Welcome to r/{searchResults.subRedditName}</h2> }
      <table className='table table-striped'>
        <tbody>
        {
          searchResults.posts.map( i => {
            return(
              <tr key={i.title}>
                <PostLink 
                  title={i.title}
                  redditUrl={i.redditUrl}
                  link={i.link}
                  postType={i.postType}
                  author={i.author}
                  ups={i.ups}
                />
              </tr>
            );
          }).slice(0, options.threadLimit)
        }
        </tbody>
      </table>
    </div>
  );
}

export default PostList;
