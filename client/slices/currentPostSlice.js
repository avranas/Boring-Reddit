import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadPage = createAsyncThunk(
  "currentPost/loadPage",
  async (redditUrl) => {
    const newUrl = `https://www.reddit.com${redditUrl}.json`;
    const response = await fetch(newUrl);
    console.log(response.status);
    if (response.status === 200) {
      const json = await response.json();
      //Got json from Reddit. Now I turn it into something my program can read
      const postData = json[0].data.children[0].data;
      const postTitle = postData.title;
      const body = postData.selftext;
      let comments = [];
      //Hardcoding a max of 10 comments for now
      json[1].data.children.slice(0, 10).forEach((i) => {
        const data = i.data;
        const newComment = {
          body: data.body,
          ups: data.ups,
          author: data.author,
        };
        comments.push(newComment);
      });
      const link = postData.url;
      const fileExtension = link.substring(postData.url.length - 4);
      let newPostType = "TitleOnly";
      if (
        fileExtension === ".jpg" ||
        fileExtension === ".png" ||
        fileExtension === ".gif"
      ) {
        newPostType = "Image";
      } else if (postData.selftext !== "") {
        newPostType = "Text";
      } else if (postData.domain.substring(0, 5) !== "self.") {
        newPostType = "Link";
      }
      const payload = {
        title: postTitle,
        body: body,
        link: link,
        postType: newPostType,
        comments: comments,
        author: postData.author,
      };
      return payload;
    }
  }
);

const currentPostSlice = createSlice({
  name: "currentPost",
  initialState: {
    currentPost: {
      title: "",
      body: "",
      redditUrl: "",
      link: "",
      postType: "", //TitleOnly, Text, Image, Link
      author: "",
      ups: 0,
      comments: [],
      isLoading: false,
      hasError: false,
    },
  },
  reducers: {
    clearPage(state, action) {
      const post = state.currentPost;
      post.title = "";
      post.body = "";
      post.redditUrl = "";
      post.link = "";
      post.postType = "";
      post.author = "";
      post.ups = 0;
      post.comments = [];
    },
  },
  extraReducers: {
    [loadPage.pending]: (state, action) => {
      state.currentPost.isLoading = true;
      state.currentPost.hasError = false;
    },
    [loadPage.fulfilled]: (state, action) => {
      state.currentPost.isLoading = false;
      state.currentPost.hasError = false;
      const payload = action.payload;
      const post = state.currentPost;
      post.title = payload.title;
      post.body = payload.body;
      post.redditUrl = payload.redditUrl;
      post.link = payload.link;
      post.postType = payload.postType;
      post.author = payload.author;
      post.ups = payload.ups;
      post.comments = payload.comments;
    },
    [loadPage.rejected]: (state, action) => {
      state.currentPost.isLoading = false;
      state.currentPost.hasError = true;
    },
  },
});

export const selectCurrentPost = (state) => state.currentPost.currentPost;
export const { clearPage } = currentPostSlice.actions;
export default currentPostSlice.reducer;
