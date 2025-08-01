import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'



export const productApi = createApi({
         reducerPath: "productApi",
         baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
         endpoints:(builder) => ({
            getAllProducts: builder.query({
                query:( ) => (
                  {
                    url:"/products",
                    method:"GET"
                  }
                ),
            })
         })
       });  


       export const {useGetAllProductsQuery} = productApi