import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '@/pages/api/instance';

import { FetchLessonsParams, Lessons } from './type';

export const fetchLessons = createAsyncThunk<Lessons, FetchLessonsParams>(
  'lessons/getLessons',
  async params => {
    const { data } = await axiosInstance.get<Lessons>(
      `core/preview-courses/${params.id}`,
    );
    return data;
  },
);
