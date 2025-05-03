import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authApi } from "./authApi";
import { setAccessToken } from "../slices/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: `http://localhost:5000/api/v1`,
    baseUrl: "https://e-commerce-backend-j03d.onrender.com/api/v1",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    register: builder.mutation({
      query: (registerDetails) => ({
        url: "/register",
        method: "POST",
        body: registerDetails,
      }),
    }),
    login: builder.mutation({
      query: (loginDetails) => ({
        url: "/login",
        method: "POST",
        body: loginDetails,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const loginResponse = await queryFulfilled;
          const accessToken = loginResponse?.data?.accessToken;
          dispatch(setAccessToken(accessToken));
          const profileResponse = await dispatch(
            authApi.endpoints.getProfile.initiate(null)
          ).unwrap();
        } catch (error) {
          if (error?.status === 401) {
            console.log("Profile fetch failed (Unauthorized):", error);
          } else {
            console.log("Login failed:", error);
          }
        }
      },
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "refresh-token",
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          //console.log("token get from refresh token : ", data.accessToken);
          dispatch(setAccessToken(data.accessToken));
        } catch (error) {
          console.error("Failed to refresh token: ", error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenMutation,
} = userApi;

// try {
//   // Await the login completion
//   const loginResponse = await queryFulfilled;
//   console.log("Login success, :", loginResponse);

//   // Now initiate the profile fetch
//   const profileResponse = await dispatch(
//     authApi.endpoints.getProfile.initiate(null)
//   ).unwrap();
//   console.log("Profile fetched successfully:", profileResponse);
// } catch (error) {
//   // Check if the error is from the login or the profile fetch
//   if (error?.status === 401) {
//     console.log("Profile fetch failed (Unauthorized):", error);
//   } else {
//     console.log("Login failed:", error);
//   }
// }
