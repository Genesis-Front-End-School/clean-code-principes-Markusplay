import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import axiosInstance from '@/pages/api/instance';

import { Course } from '../type';

export const fetchCourses = createAsyncThunk<Course[]>(
  'courses/getCourses',
  async () => {
    const { data } = await axiosInstance.get<{ courses: Course[] }>(
      'core/preview-courses',
    );
    return data.courses;
  },
);
