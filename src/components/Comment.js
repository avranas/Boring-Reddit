import updoot from '../images/updoot.png';
const parse = require('html-react-parser');
const MarkdownIt = require('markdown-it');

const Comment = (props) => {

  const md = new MarkdownIt();
  const bodyAsHtml = md.render(props.body);
  
  return (
    <tr>
      <td class="upvotes">
        <img alt="upvote" src={updoot}/>
      </td>
      <td class="upvotes">
        <p>{props.ups}</p>
      </td>
      <td>
        <tr>
          <td className="author">
            {parse(bodyAsHtml)}
          </td>
        </tr>
        <tr>
          <td id="comment-body">
            <p>u/{props.author}</p>
          </td>
        </tr>
      </td>
    </tr>
  );
}

export default Comment;
