import CommentList from './CommentList';
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentPost } from '../slices/currentPostSlice';
import { selectOptions } from '../slices/optionsSlice';
import { Link } from 'react-router-dom';
const parse = require('html-react-parser');
const MarkdownIt = require('markdown-it');

const Post = (props) => {

  const currentPost = useSelector(selectCurrentPost);
  const options = useSelector(selectOptions);
  const dispatch = useDispatch();
  const md = new MarkdownIt();
  const bodyAsHtml = md.render(currentPost.body);

  //Clear the post when exiting
  const handleBackButtonClick = () => {
    dispatch({type: 'currentPost/clearPage', action: {}});
  }

  return (
    <div className="post">
      <div className='post-head'>
      <Link to="/search">
        <button onClick={handleBackButtonClick}className='back-button'></button>
      </Link>
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

//TODO NEXT: BOOOTSTRAP