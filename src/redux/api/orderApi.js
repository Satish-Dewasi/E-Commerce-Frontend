import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAccessToken } from "../slices/userSlice";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000/api/v1",
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

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    checkouts: builder.mutation({
      query: (payload) => ({
        url: "/orders/checkouts",
        method: "POST",
        body: payload,
      }),
    }),
    updatePaymentStatus: builder.mutation({
      query: (payload) => ({
        url: "/orders/payment-update",
        method: "POST",
        body: payload,
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useCheckoutsMutation,
  useUpdatePaymentStatusMutation,
} = orderApi;
