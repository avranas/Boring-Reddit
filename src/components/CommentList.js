import Comment from './Comment';

const CommentList = ({comments}) => {

  return (
    <div className="comment-list">
      <h2>Comments</h2>
      <table className='table table-striped'>
        <tbody>
        {
        comments.map( i => {
          return (
            <tr key={i.body}>
              <Comment
                body={i.body}
                ups={i.ups}
                author={i.author}
              />
            </tr>
          )
        })
        }
        </tbody>
      </table>
    </div>
  );
}

export default CommentList;
