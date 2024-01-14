import { configureStore } from "@reduxjs/toolkit";
import searchResultsReducer from "./slices/searchResultsSlice";
import currentPostReducer from "./slices/currentPostSlice";
import optionsReducer from "./slices/optionsSlice";

export default configureStore({
  reducer: {
    searchResults: searchResultsReducer,
    currentPost: currentPostReducer,
    options: optionsReducer,
  },
});
