// src/features/users/userApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/auth", 
    credentials: "include", 
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users", 
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;
