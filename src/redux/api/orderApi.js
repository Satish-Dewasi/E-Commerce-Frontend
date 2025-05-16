import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: `http://localhost:5000/api/v1`,
    baseUrl: "https://e-commerce-backend-j03d.onrender.com/api/v1",
    credentials: "include",
  }),

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
  }),
});

export const { useCheckoutsMutation, useUpdatePaymentStatusMutation } =
  orderApi;
