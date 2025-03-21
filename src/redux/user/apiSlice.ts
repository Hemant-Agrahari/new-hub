import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../middleware'
import UserType from '@/types/user'

export const authApi = createApi({
  reducerPath: 'user',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Get user data
    getUser: builder.query<UserType, void>({
      query: () => ({
        url: '/getUserDetails',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetUserQuery } = authApi
