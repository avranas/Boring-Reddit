import { useState } from "react";
import { getSearchResults } from "../slices/searchResultsSlice";
import { useDispatch } from "react-redux";
import { useNavigate
 } from "react-router-dom";
const SearchBar = (props) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchBarText, setSearchBarText] = useState('');

  const handleChange = (e) => {
    setSearchBarText(e.target.value);
  }

  //This part handles reddit data
  const handleSubmit = async () => {
    navigate('/search');
    //Clear everything first.
    dispatch({type: 'searchResults/clearResults', payload: {}});
    dispatch({type: 'currentPost/clearPage', payload: {}});
    dispatch(getSearchResults(searchBarText));
  }

  return (
    <div className="search">
      <label>Search r/</label>
      <input type="search" id="search" defaultValue={searchBarText} onChange={handleChange}></input>
      <button onClick={handleSubmit}>Search</button>
    </div>
  );
}

export default SearchBar;
