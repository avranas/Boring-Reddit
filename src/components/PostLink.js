import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadPage } from '../slices/currentPostSlice';

const PostLink = (props) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(loadPage(props));
  }

  return (
    <div className="post-link">
      <div className='ups'>
        <p>{props.ups}</p>
      </div>
      <div className='link'>
        <Link to='/post' onClick={handleClick}>{props.title}</Link>
      </div>
      <div className='author'>
        <p>u/{props.author}</p>
        </div>
    </div>
  );
}

export default PostLink;
