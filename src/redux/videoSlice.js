import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
  searchVideosList: null,
};
const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    videoStart: (state) => {
      state.loading = true;
    },

    videoSuccess: (state, action) => {
      state.currentVideo = null;
      state.loading = false;
      state.currentVideo = action.payload;
    },

    failToGet: (state) => {
      state.loading = false;
      state.error = true;
    },

    clearVideo: (state) => {
      state.currentVideo = null;
    },

    search: (state, action) => {
      state.searchVideosList = null;
      state.searchVideosList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const actions = videoSlice.actions;

export default videoSlice;
