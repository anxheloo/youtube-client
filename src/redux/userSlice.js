import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: true,
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },

    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },

    logout: (state) => {
      //Way 1 using directly the initialState
      //  return initialState

      //Way 2 :
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },

    currentUserUpdate: (state, action) => {
      state.currentUser = action.payload;
    },

    darkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

// Action creators are generated for each case reducer function
export const userActions = userSlice.actions;

export default userSlice;
