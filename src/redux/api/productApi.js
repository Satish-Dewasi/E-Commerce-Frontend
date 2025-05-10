import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://e-commerce-backend-j03d.onrender.com/api/v1`,

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      const isAdmin = getState().auth.isAdmin; // Directly access the isAdmin state

      // Add Authorization header only if the user is an admin and a token is present
      if (isAdmin && token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ pageNumber, category, minPrice, maxPrice }) => {
        const params = new URLSearchParams();

        // Add parameters conditionally
        if (pageNumber) params.append("pageNumber", pageNumber);
        if (category) params.append("category", category);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);

        // Return the constructed URL with query parameters
        return `/products?${params.toString()}`;
      },
    }),

    searchProducts: builder.query({
      query: (keyword) => ({
        url: `/products/search?keyword=${keyword}`,
        method: "GET",
      }),
    }),

    randomProducts: builder.query({
      query: (number) => ({
        url: `/products/random/${number}`,
        method: "GET",
      }),
    }),

    getProductByID: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),

    getProductByCategory: builder.query({
      query: (category) => ({
        url: `/products/category/${category}`,
        method: "GET",
      }),
    }),

    addNewProduct: builder.mutation({
      query: (productDetails) => ({
        url: "/admin/product/new",
        method: "POST",
        //credentials: "include",
        body: productDetails, // Authentication needed
      }),
    }),

    // Add other admin routes here in the same way
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIDQuery,
  useSearchProductsQuery,
  useRandomProductsQuery,
  useGetProductByCategoryQuery,
  useAddNewProductMutation,
} = productApi;
