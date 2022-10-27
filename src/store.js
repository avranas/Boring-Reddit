import { configureStore } from "@reduxjs/toolkit";
import searchResultsReducer from "../src/slices/searchResultsSlice";
import currentPostReducer from "../src/slices/currentPostSlice";
import optionsReducer from "../src/slices/optionsSlice";

export default configureStore({
  reducer: {
    searchResults: searchResultsReducer,
    currentPost: currentPostReducer,
    options: optionsReducer,
  },
});
