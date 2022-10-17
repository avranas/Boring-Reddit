const parse = require('html-react-parser');
const MarkdownIt = require('markdown-it');

const Comment = (props) => {

  const md = new MarkdownIt();
  const bodyAsHtml = md.render(props.body);

  return (
    <div className="comment">
      <div className="ups">
        <p>{props.ups}</p>
      </div>
      <div className="comment-body">
        {parse(bodyAsHtml)}
      </div>
      <div className="author">
        <p>u/{props.author}</p>
      </div>
    </div>
  );
}

export default Comment;
