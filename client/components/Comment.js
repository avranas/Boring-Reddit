import React from "react";
import updoot from "../images/updoot.png";
const parse = require("html-react-parser");
const MarkdownIt = require("markdown-it");

const Comment = (props) => {
  const md = new MarkdownIt();
  const bodyAsHtml = md.render(props.body);

  return (
    <tr data-testid={`comment-${props.id}`}>
      <td className="upvotes">
        <img alt="upvote" src={updoot} />
      </td>
      <td className="upvotes">
        <p>{props.ups}</p>
      </td>
      <td>
        <table>
          <tbody>
            <tr>
              <td>{parse(bodyAsHtml)}</td>
            </tr>
            <tr>
              <td id="comment-body">
                <p className="author">u/{props.author}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
};

export default Comment;
