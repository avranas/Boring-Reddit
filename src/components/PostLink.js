import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const PostLink = ({title, url}) => {

  const dispatch = useDispatch();

  const handleClick = async () => {
    const response = await fetch(url);
    console.log(response.status);
    if (response.status === 200) {
      const json = await response.json();
      //Got json from Reddit. Now I turn it into something my program can read
      const postData = json[0].data.children[0].data;
      const title = postData.title;
      const body = postData.selftext;
      //const media = (worry about this later)
      let comments = [];
      //Hardcoding a max of 10 comments for now
      json[1].data.children.slice(0, 10).forEach( i => {
        comments.push(i.data.body);
      });
      const testPayload = {
        title: title,
        body: body,
        //media:  "http://placekitten.com/400/500",
        comments: comments
      }
      dispatch({type: 'currentPost/loadPage', payload: testPayload});
    } else {
      alert('Data not found! :(');
    }
  }

  return (
    <div className="post-list">
      <Link to='/post' onClick={handleClick}>{title}</Link>
    </div>
  );
}

export default PostLink;
