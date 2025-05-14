import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GET_DATA } from './types'

export const todolistApi = createApi({
  reducerPath: 'todolistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ' https://jsonplaceholder.typicode.com',
  }),
  tagTypes: ['Todolist'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => `${GET_DATA}`, 
      providesTags: ['Todolist'],
    }),
	   deleteTodos: builder.mutation({
      query: (cardId) => ({
        url: `${GET_DATA}/${cardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todolist'],
    }),
    updateTodoStatus: builder.mutation({
  query: ({ id, completed }) => ({
    url: `${GET_DATA}/${id}`,
    method: 'PUT',
    body: { completed },
  }),
  invalidatesTags: ['Todolist'],
}),
  }),
});

export const { useGetTodosQuery, useDeleteTodosMutation, useUpdateTodoStatusMutation } = todolistApi;
