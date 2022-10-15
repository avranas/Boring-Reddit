import CommentList from './CommentList';
import { useSelector } from "react-redux";
import { selectCurrentPost } from '../slices/currentPostSlice';
import { Link } from 'react-router-dom';

const Post = (props) => {

  const currentPost = useSelector(selectCurrentPost);

  return (
    <div className="post">
      <div className='post-head'>
      <Link to="/">
        <button className='back-button'></button>
      </Link>
        <h2>{currentPost.title}</h2>
      </div>
      <p>
        {currentPost.body}
      </p>
      {
        currentPost.media && <img src={currentPost.media} alt="post"/>
      }
      <CommentList comments={currentPost.comments}/>
    </div>
  );
}

export default Post;
