import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  },
});

// Action creators are generated for each case reducer function
export const actions = userSlice.actions;

export default userSlice;
