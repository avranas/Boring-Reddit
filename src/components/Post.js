import CommentList from './CommentList';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentPost, loadPage } from '../slices/currentPostSlice';
import { selectOptions } from '../slices/optionsSlice';
import { useNavigate } from 'react-router-dom';
import LoadIcon from '../components/LoadIcon';

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
    dispatch({type: 'currentPost/clearPage', payload: {}});
    navigate(-1);
  }

  let postBody = [];
  if (currentPost.isLoading) {
    postBody.push(<LoadIcon  key={'load'} />);
  } else if (currentPost.hasError) {
    postBody.push(<h3 key={'error'} >An error occured while loading the post :(</h3>);
  } else {
    let newElement = null;
    switch (currentPost.postType) {
      case 'Image':
        newElement =
          <a href={currentPost.link} key={'content'} >
            <img src={currentPost.link} alt="post" className="post-image" />
          </a>
        break;
      case 'Text':
        parse(bodyAsHtml);
        break;
      case 'Link':
        newElement = <p key={'content'} id="external-link"><a href={currentPost.link}>External Link</a></p>
        break;
      default:
        break;
    }
    postBody.push(newElement);
    if (options.commentsOn) {
      postBody.push(<CommentList key={'comments'} comments={currentPost.comments}/>);
    }
  }

  return (
    <div className="container" data-testid="post">
      <div className="post-head">
        <div id="button-holder">
          <button onClick={handleBackButtonClick} className='back-button'></button>
        </div>
        <div>
          {
            currentPost.author && <p className="author align-bottom">u/{currentPost.author}</p>
          }
          <h2 id="post-spacing">{currentPost.title}</h2>
        </div>
      </div>
      {postBody }
    </div>
  );
}

export default Post;
