import { Link } from "react-router-dom";
import updoot from "../images/updoot.png";

const PostLink = (props) => {
  return (
    <tr data-testid={`post-link-${props.id}`}>
      <td className="upvotes">
        <img alt={"upvote"} src={updoot} id="upvote-img" />
      </td>
      <td className="upvotes">
        <p>{props.ups}</p>
      </td>
      <td>
        <table>
          <tbody>
            <tr>
              <td>
                {props.nsfw && <p className="nsfw">NSFW</p>}
                <Link to={`/post?redditUrl='${props.redditUrl}'`}>
                  {props.title}
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <p className="author">u/{props.author}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
};

export default PostLink;
