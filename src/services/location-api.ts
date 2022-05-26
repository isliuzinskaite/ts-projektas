import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Location } from '../types';

export const locationApi = createApi({
  reducerPath: 'locationApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (builder) => ({
    getAll: builder.query<Location[], void>({
      query: () => 'locations',
    }),
  }),
});

export const { useGetAllQuery } = locationApi;
