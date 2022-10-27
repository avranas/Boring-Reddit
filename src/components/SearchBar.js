import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchBar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchBarText, setSearchBarText] = useState("");

  const handleChange = (e) => {
    setSearchBarText(e.target.value);
  };

  const handleSubmit = async () => {
    if (searchBarText === "") {
      alert("Search bar can not be empty");
    } else {
      //Clear everything first.
      dispatch({ type: "searchResults/clearResults", payload: {} });
      dispatch({ type: "currentPost/clearPage", payload: {} });
      navigate(`/search-results?search=${searchBarText}`);
      setSearchBarText("");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="search" data-testid="searchbar">
      <label htmlFor="search">Search r/</label>
      <input
        type="search"
        id="search"
        name="search"
        value={searchBarText}
        onChange={handleChange}
        onKeyUp={handleKeyPress}
      ></input>
      <button data-testid="searchbar-button" onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
