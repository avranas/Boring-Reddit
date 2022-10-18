import CommentList from './CommentList';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentPost, loadPage } from '../slices/currentPostSlice';
import { selectOptions } from '../slices/optionsSlice';
import { useNavigate } from 'react-router-dom';

const parse = require('html-react-parser');
const MarkdownIt = require('markdown-it');

const Post = ({redditUrl}) => {

  const currentPost = useSelector(selectCurrentPost);
  const options = useSelector(selectOptions);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const md = new MarkdownIt();
  const bodyAsHtml = md.render(currentPost.body);

  useEffect(() => {
    //Take redditUrl, remove the quotes, then loadPage will add 
    //"http://www.reddit.com" to the front and .json to the back
    const newUrl = redditUrl.slice(1, redditUrl.length - 1);
    dispatch(loadPage(newUrl));
  }, [dispatch, redditUrl]);

  const handleBackButtonClick = () => {
    //dispatch({type: 'searchResults/clearResults', payload: {}});
    dispatch({type: 'currentPost/clearPage', payload: {}});
    navigate(-1);
  }

  return (
    <div className="post container">
      <div className='post-head'>
        <table className='table'>
          <tr>
            <td>
              <button onClick={handleBackButtonClick} className='back-button'></button>
            </td>
            <td>
              <p>u/{currentPost.author}</p>
            </td>
          </tr>
        </table>
        <h2>{currentPost.title}</h2>
      </div>
      {currentPost.isLoading && <h3>Loading...</h3>}
      {currentPost.hasError && <h3>An error occured while loading the post :(</h3> }
      {
        currentPost.postType === "Image" ?
        <img src={currentPost.link} alt="post" className="post-image" />
        : currentPost.postType === "Text" ?
        parse(bodyAsHtml)
        : currentPost.postType === "Link" ?
        <p><a href={currentPost.link}>Click here</a></p>
        : null
      }
      {
        !options.commentsOff && <CommentList comments={currentPost.comments}/>
      }
      {currentPost.isLoading && <h3>Loading...</h3>}
    </div>
  );
}

export default Post;
