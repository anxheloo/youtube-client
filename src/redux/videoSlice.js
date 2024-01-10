import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const actions = videoSlice.actions;

export default videoSlice;
