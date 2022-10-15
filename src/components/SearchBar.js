import { useState } from "react";
import { useDispatch } from 'react-redux';

const SearchBar = (props) => {

  const [searchBarText, setSearchBarText] = useState();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearchBarText(e.target.value);
  }

  //This part handles reddit data
  const handleSubmit = async (e) => {
    const results = await fetch(`https://www.reddit.com/r/${searchBarText}.json`);
    console.log(results.status)
    if (results.status === 200) {
      const json = await results.json();
      //Got json from Reddit. Now I turn it into something my program can read
      let newPostList = [];
      //Hardcoding 10 for now.
      for (let i = 0; i !== 10; i++) {
        const postData = json.data.children[i].data;
        const url = postData.permalink;
        const editedUrl = url.slice(0, -1) //There's a '/' at the end and I need to remove it
        const finalUrl = 'https://www.reddit.com' + editedUrl + '.json';
        const newPost = {
          title: postData.title,
          url: finalUrl
        }
        newPostList.push(newPost);
      }
      let payload = {
        subRedditName: searchBarText,
        posts: newPostList
      };
      dispatch({type: 'searchResults/addResults', payload: payload});
    } else {
      alert('Subreddit not found :( Try a different search term!')
    }
  }

  return (
    <div className="search">
      <label>Search r/</label>
      <input type="search" id="search" onChange={handleChange}></input>
      <button onClick={handleSubmit}>Search</button>
    </div>
  );
}

export default SearchBar;
