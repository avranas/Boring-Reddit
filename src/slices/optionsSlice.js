import { createSlice } from '@reduxjs/toolkit';

export const getInitialThreadLimit = () => {
  return localStorage.getItem("threadLimit") || 10;
}

export const getInitialCommentsOff = () => {
  const commentsOff = localStorage.getItem("commentsOff") || "false";
  return commentsOff === "true";
}

const optionsSlice = createSlice({
  name: 'options',
  initialState: {
    options: {
      threadLimit: getInitialThreadLimit(),
      commentsOff: getInitialCommentsOff()
    }
  },
  reducers: {
    setThreadLimit(state, action) {
      const newThreadLimit = action.payload.threadLimit;
      localStorage.setItem("threadLimit", newThreadLimit)
      state.options.threadLimit = newThreadLimit;
    },
    setCommentsOff(state, action) {
      const newCommentsOff = action.payload.commentsOff;
      localStorage.setItem("commentsOff", newCommentsOff)
      state.options.commentsOff = action.payload.commentsOff;
    }
  }
});

export const selectOptions = state => state.options.options;
export const { setThreadLimit, setCommentsOff } = optionsSlice.actions;
export default optionsSlice.reducer;
