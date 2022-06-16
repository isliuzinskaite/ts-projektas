import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Region,
  OneRegion,
  OneLocation,
  OneProperty,
} from '../types';

export const regionApi = createApi({
  reducerPath: 'regionApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1337/api/' }),
  endpoints: (builder) => ({
    getAll: builder.query<Region[], void>({
      query: () => 'regions?populate=locations',
    }),
    getRegion: builder.query<OneRegion, string>({
      query: (id) => `regions/${id}?populate=locations`,
    }),
    getLocation: builder.query<OneLocation, string>({
      query: (id) => `locations/${id}?populate=properties`,
    }),
    getProperty: builder.query<OneProperty, string>({
      query: (id) => `properties/${id}`,
    }),
  }),
});

export const {
  useGetAllQuery,
  useGetRegionQuery,
  useGetLocationQuery,
  useGetPropertyQuery,
} = regionApi;
