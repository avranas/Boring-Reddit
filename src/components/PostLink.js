import { Link } from 'react-router-dom';

const PostLink = (props) => {

  return (
    <div className="post-link">
      <tr key={props.title}>
        <td className='ups'>
          <p>{props.ups}</p>
        </td>
        <td className='link'>
          <tr>
            <td>
              <Link to={`/post?redditUrl='${props.redditUrl}'`}>{props.title}</Link>
            </td>
          </tr>
          <tr>
            <td>
              <p>u/{props.author}</p>
            </td>
          </tr>
        </td>
      </tr>
    </div>
  );
}

export default PostLink;
