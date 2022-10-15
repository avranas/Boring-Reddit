import PostLink from './PostLink';
import { useSelector } from "react-redux";
import { selectSearchResults } from '../slices/searchResultsSlice';

const PostList = (props) => {
  
  const searchResults = useSelector(selectSearchResults);
  
  return (
    <div className="post-list">
      {
      searchResults.subRedditName ?
      <h2>Welcome to r/{searchResults.subRedditName}</h2> :
      <h2>Search for a Subreddit</h2>
      }
      <ul>{
        searchResults.posts.map( i => {
          return(
            <li key={i.title}>
              <PostLink title={i.title} url={i.url}/>
            </li>
          );
        })
      }</ul>
    </div>
  );
}

export default PostList;
