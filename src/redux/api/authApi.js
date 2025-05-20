import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setAccessToken,
  setUser,
  setIsAuthenticated,
  setIsAdmin,
  setShowSignupPage,
} from "../slices/userSlice";

// Create a custom baseQuery to handle token refreshing
const baseQuery = fetchBaseQuery({
  //baseUrl: "http://localhost:5000/api/v1",
  baseUrl: "https://e-commerce-backend-j03d.onrender.com/api/v1",
  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If the access token is expired, try to refresh it
  if (result?.error?.status === 403 || result?.error?.status === 401) {
    // Attempt to refresh the token
    const refreshResult = await baseQuery("/refresh-token", api, extraOptions);
    if (refreshResult?.data) {
      const newAccessToken = refreshResult.data.accessToken;

      // Store the new token in Redux
      api.dispatch(setAccessToken(newAccessToken));

      // Retry the original query with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // If refresh fails, redirect to login or handle accordingly
      console.error("Refresh token failed");
    }
  }

  return result;
};

// Create the API with the custom base query
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/profile",
      transformErrorResponse: (response) => response?.data?.user,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;

          dispatch(setUser(response?.data?.user));
          dispatch(setIsAuthenticated(true));
          dispatch(setShowSignupPage(false));
          dispatch(setIsAdmin(response?.data?.user.role === "admin"));
        } catch (error) {
          console.log("Fetching profile failed:", error);
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
    }),

    // admin routes
    getUsers: builder.query({
      query: () => "admin/users",
    }),
  }),
});

export const { useGetProfileQuery, useGetUsersQuery, useLogoutMutation } =
  authApi;

//   baseUrl: "https://e-commerce-backend-j03d.onrender.com/api/v1",
