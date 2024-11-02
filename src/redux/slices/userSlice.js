import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSignupPage: true,
  accessToken: null,
  user: null,
  isAuthenticated: false,
  isAdmin: false,
};

const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    setShowSignupPage: (state, action) => {
      state.showSignupPage = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

// export the action to change showCart state
export const {
  setShowSignupPage,
  setUser,
  setAccessToken,
  setIsAuthenticated,
  setIsAdmin,
} = userSlice.actions;

// exporting reducer itself to configure it in store
export default userSlice.reducer;
