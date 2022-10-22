import { createSlice } from '@reduxjs/toolkit';

export const getInitialThreadLimit = () => {
  //When .getItem() can't find what it's looking for, it returns "undefined" as a
  //STRING for some reason.
  let threadLimit = localStorage.getItem("threadLimit");
  if (threadLimit === "undefined") {
    threadLimit = 10;
  }
  return threadLimit;
}

export const getInitialCommentsOn = () => {
  //When .getItem() can't find what it's looking for, it returns "undefined" as a
  //STRING for some reason.
  let commentsOn = localStorage.getItem("commentsOn");
  if (commentsOn === "undefined") {
    commentsOn = "true";
  }
  return commentsOn === "true"
}

const optionsSlice = createSlice({
  name: 'options',
  initialState: {
    options: {
      threadLimit: getInitialThreadLimit(),
      commentsOn: getInitialCommentsOn()
    }
  },
  reducers: {
    setThreadLimit(state, action) {
      const newThreadLimit = action.payload.value;
      localStorage.setItem("threadLimit", newThreadLimit)
      state.options.threadLimit = newThreadLimit;
    },
    setCommentsOn(state, action) {
      const newCommentsOn = action.payload.commentsOn;
      localStorage.setItem("commentsOn", newCommentsOn)
      state.options.commentsOn = action.payload.commentsOn;
    }
  }
});

export const selectOptions = state => state.options.options;
export const { setThreadLimit, setCommentsOn } = optionsSlice.actions;
export default optionsSlice.reducer;
