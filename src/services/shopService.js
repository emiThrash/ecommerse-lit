import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base_url } from '../firebase/database';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  tagTypes: ['orders', 'maps'],
  baseQuery: fetchBaseQuery({ baseUrl: base_url}),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `products.json`
    }),
    getProductById: builder.query({
      query: (id) => `products.json?orderBy="id"&equalTo=${id}`
    }),
    getProductsByCategory: builder.query({
      query: (categoryId) => `products.json?orderBy="categoryId"&equalTo=${categoryId}`
    }),
    getCategories: builder.query({
      query: () => `categories.json`
    }),
    postOrder: builder.mutation({
      query: ({...order}) => ({
        url: 'orders.json',
        method: 'POST',
        body: order
      }),
      invalidatesTags: ['orders'],
    }),
    getOrders: builder.query({
      query: () => `orders.json`,
      providesTags: [ 'orders' ]
    }),
    getProfileImage: builder.query({
      query: (localId) => `profileImages/${localId}.json`,
    }),
    postProfileImage: builder.mutation({
      query: ({ image, localId }) => ({
        url: `profileImages/${localId}.json`,
        method: 'PUT',
        body: {
          image: image
        }
      }),
    }),
    postProfileLocation: builder.mutation({
      query: ({ location, localId }) => ({
        url: `profileLocations/${localId}.json`,
        method: 'PUT',
        body: {
          location: location
        }
      }),
      invalidatesTags: ['maps'],
    }),
    getProfileLocation: builder.query({
      query: (localId) => `profileLocations/${localId}.json`,
      providesTags: [ 'maps' ]
    }),
  })
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useGetCategoriesQuery,
  usePostOrderMutation,
  useGetOrdersQuery,
  useGetProfileImageQuery,
  usePostProfileImageMutation,
  usePostProfileLocationMutation,
  useGetProfileLocationQuery,
 } = shopApi;