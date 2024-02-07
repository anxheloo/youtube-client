import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};
const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    videoStart: (state) => {
      state.loading = true;
    },

    videoSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },

    failToGet: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const actions = videoSlice.actions;

export default videoSlice;
