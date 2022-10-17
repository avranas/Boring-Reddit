import Comment from './Comment';

const CommentList = ({comments}) => {

  return (
    <div className="comment-list">
      <h2>Comments</h2>
      <ul>{
        comments.map( i => {
          return (
            <li key={i.body}>
              <Comment
                body={i.body}
                ups={i.ups}
                author={i.author}
              />
            </li>
          )
        })
      }
      </ul>
    </div>
  );
}

export default CommentList;