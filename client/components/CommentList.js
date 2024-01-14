import React from "react";
import Comment from "./Comment";

const CommentList = ({ comments }) => {
  return (
    <div data-testid="comment-list">
      <h3>Comments</h3>
      <table className="table table-striped">
        <tbody>
          {comments.map((i, key) => {
            return (
              <Comment
                id={key}
                key={key}
                body={i.body}
                ups={i.ups}
                author={i.author}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CommentList;
