const CommentList = ({comments}) => {

  return (
    <div className="comment-list">
      <h2>Comments</h2>
      <ul>
        {
          comments.map( i => {
            return <li key={i}>{i}</li>
          })
        }
      </ul>
    </div>
  );
}

export default CommentList;
