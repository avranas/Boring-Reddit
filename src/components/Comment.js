const parse = require('html-react-parser');
const MarkdownIt = require('markdown-it');

const Comment = (props) => {

  const md = new MarkdownIt();
  const bodyAsHtml = md.render(props.body);

  return (
    <div className="comment">
      <td className="ups">
        <p>{props.ups}</p>
      </td>
      <td>
        <tr>
          <td className="author">
            <p>u/{props.author}</p>
            <hr/>
          </td>
        </tr>
        <tr>
          <td className="comment-body">
            {parse(bodyAsHtml)}
          </td>
        </tr>
      </td>
    </div>
  );
}

export default Comment;
