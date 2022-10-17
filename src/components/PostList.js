import PostLink from './PostLink';
import { useSelector } from "react-redux";
import { selectSearchResults } from '../slices/searchResultsSlice';
import { selectOptions } from '../slices/optionsSlice';

const PostList = (props) => {
  
  const searchResults = useSelector(selectSearchResults);
  const options = useSelector(selectOptions);
  
  return (
    <div className="post-list">
      { searchResults.isLoading && <h3>Loading...</h3> }
      { searchResults.hasError && <h2>Subreddit not found :( Try a different search term!</h2> }
      { !searchResults.hasError && !searchResults.isLoading && <h2>Welcome to r/{searchResults.subRedditName}</h2> }
      <ul>{
        searchResults.posts.map( i => {
          return(
            <li key={i.title}>
              <PostLink 
                title={i.title}
                redditUrl={i.redditUrl}
                link={i.link}
                postType={i.postType}
                author={i.author}
                ups={i.ups}
              />
            </li>
          );
        }).slice(0, options.threadLimit)
      }</ul>
    </div>
  );
}

export default PostList;
