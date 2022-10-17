import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getSearchResults = createAsyncThunk(
  'searchResults/getSearchResults',
  async (searchBarText) => {
    const results = await fetch(`https://www.reddit.com/r/${searchBarText}.json`);
    console.log(results.status)
    if (results.status === 200) {
      const json = await results.json();
      //Got json from Reddit. Now I turn it into something my program can read
      let newPostList = [];
      const children = json.data.children
      for (let i = 0; i !== children.length; i++) {
        const postData = json.data.children[i].data;
        const url = postData.permalink;
        const editedUrl = url.slice(0, -1) //There's a '/' at the end and I need to remove it
        const redditUrl = 'https://www.reddit.com' + editedUrl + '.json';
        const fileExtension = postData.url.substring(postData.url.length - 4);
        let newPostType = "TitleOnly";
        if (fileExtension === ".jpg" || 
          fileExtension === ".png" ||
          fileExtension === ".gif") {
            newPostType = "Image";
          }
        else if (postData.selftext !== "") {
          newPostType = "Text";
        } else if (postData.domain.substring(0, 5) !== "self."){
          newPostType = "Link"
        }
        const newPost = {
          title: postData.title,
          redditUrl: redditUrl,
          link: postData.url,
          postType: newPostType,
          author: postData.author,
          ups: postData.ups
        }
        newPostList.push(newPost);
      }
      let payload = {
        subRedditName: searchBarText,
        posts: newPostList
      };
      return payload;
    }
  }
);

const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState: {
    searchResults: {
      subRedditName: '',
      posts: [],
      isLoading: false,
      hasError: false
    }
  },
  reducers: {
    clearResults(state, action) {
      const results = state.searchResults;
      results.subRedditName = '';
      results.posts = []
    }
  },
  extraReducers: {
    [getSearchResults.pending]: (state, action) => {
      state.searchResults.isLoading = true;
      state.searchResults.hasError = false;
    },
    [getSearchResults.fulfilled]: (state, action) => {
      state.searchResults.isLoading = false;
      state.searchResults.hasError = false;
      const results = state.searchResults;
      results.subRedditName = action.payload.subRedditName;
      results.posts = action.payload.posts;
    },
    [getSearchResults.rejected]: (state, action) => {
      state.searchResults.isLoading = false;
      state.searchResults.hasError = true;
    }
  }
});

export const selectSearchResults = state => state.searchResults.searchResults;
export const { addResults, clearResults } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;