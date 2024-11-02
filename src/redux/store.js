import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/userSlice";
import { productApi } from "./api/productApi.js";
import { userApi } from "./api/userApi.js";
import { authApi } from "./api/authApi.js";

export const store = configureStore({
  reducer: {
    Cart: cartSlice,
    auth: userSlice,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      userApi.middleware,
      authApi.middleware,
    ]),
});
