import { Link } from 'react-router-dom';
import updoot from '../images/updoot.png';

const PostLink = (props) => {

  return (
      <tr key={props.title}>
        <td class="upvotes">
          <img alt={"upvote"} src={updoot} id='upvote-img'/>
          </td>
        <td class="upvotes">
          <p>{props.ups}</p>
        </td>
        <td>
          <tr>
            <td>
              {
                props.nsfw && <p class="nsfw">NSFW</p>
              }
              <Link to={`/post?redditUrl='${props.redditUrl}'`}>{props.title}</Link>
            </td>
          </tr>
          <tr>
            <td>
              <p className="author">u/{props.author}</p>
            </td>
          </tr>
        </td>
      </tr>
  );
}

export default PostLink;
