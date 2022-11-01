import { createSlice } from "@reduxjs/toolkit";

export const getInitialThreadLimit = () => {
  //When .getItem() can't find what it's looking for, it returns "undefined" as a
  //STRING for some reason.
  let threadLimit = localStorage.getItem("threadLimit");
  if (threadLimit === null) {
    threadLimit = "10";
  }
  return threadLimit;
};

export const getInitialCommentsOn = () => {
  let commentsOn = localStorage.getItem("commentsOn");
  if (commentsOn === null) {
    commentsOn = "true";
  }
  return commentsOn === "true";
};

export const getInitialHideNsfw = () => {
  let hideNSFW = localStorage.getItem("hideNSFW");
  if (hideNSFW === null) {
    hideNSFW = "true";
  }
  return hideNSFW === "true";
};

const optionsSlice = createSlice({
  name: "options",
  initialState: {
    options: {
      threadLimit: getInitialThreadLimit(),
      commentsOn: getInitialCommentsOn(),
      hideNSFW: getInitialHideNsfw(),
    },
  },
  reducers: {
    setThreadLimit(state, action) {
      const newThreadLimit = action.payload.value;
      localStorage.setItem("threadLimit", newThreadLimit);
      state.options.threadLimit = newThreadLimit;
    },
    setCommentsOn(state, action) {
      const newCommentsOn = action.payload.commentsOn;
      localStorage.setItem("commentsOn", newCommentsOn);
      state.options.commentsOn = newCommentsOn;
    },
    setHideNSFW(state, action) {
      const newHideNSFW = action.payload.hideNSFW;
      localStorage.setItem("hideNSFW", newHideNSFW);
      state.options.hideNSFW = newHideNSFW;
    },
  },
});

export const selectOptions = (state) => state.options.options;
export const { setThreadLimit, setCommentsOn, setHideNSFW } =
  optionsSlice.actions;
export default optionsSlice.reducer;
