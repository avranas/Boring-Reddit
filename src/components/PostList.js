import PostLink from "../components/PostLink";
import { useSelector } from "react-redux";
import { selectSearchResults } from "../slices/searchResultsSlice";
import { selectOptions } from "../slices/optionsSlice";
import { useDispatch } from "react-redux";
import { getSearchResults } from "../slices/searchResultsSlice";
import { useEffect } from "react";
import LoadIcon from "../components/LoadIcon";

const PostList = ({ searchParams }) => {
  const searchResults = useSelector(selectSearchResults);
  const options = useSelector(selectOptions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearchResults(searchParams));
  }, [dispatch, searchParams]);

  let body = searchResults.posts
    .map((i, key) => {
      return (
        <PostLink
          id={key}
          key={key}
          title={i.title}
          redditUrl={i.redditUrl}
          link={i.link}
          postType={i.postType}
          author={i.author}
          ups={i.ups}
          nsfw={i.nsfw}
        />
      );
    })
    .slice(0, options.threadLimit);
  if (options.hideNSFW) {
    body = body.filter((i) => {
      return i.props.nsfw === false;
    });
  }

  return (
    <div id="post-list" className="container" data-testid="post-list">
      {searchResults.isLoading && <LoadIcon />}
      {searchResults.hasError && (
        <h2>Subreddit not found :( Try a different search term!</h2>
      )}
      {!searchResults.hasError && !searchResults.isLoading && (
        <h2 data-testid="welcome-header" id="welcome">
          Welcome to r/{searchResults.subRedditName}
        </h2>
      )}
      <table className="table table-striped">
        <tbody>{body}</tbody>
      </table>
    </div>
  );
};

export default PostList;
