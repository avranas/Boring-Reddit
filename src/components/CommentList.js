import Comment from './Comment';

const CommentList = ({comments}) => {

  return (
    <div>
      <h3>Comments</h3>
      <table className='table table-striped'>
        <tbody>{
          comments.map( i => {
            return (
              <Comment
                body={i.body}
                ups={i.ups}
                author={i.author}
              />
            );
          })
        }
        </tbody>
      </table>
    </div>
  );
}

export default CommentList;
