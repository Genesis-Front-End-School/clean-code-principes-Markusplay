import { configureStore } from '@reduxjs/toolkit';

import { fetchCourses } from '../courses/asyncActions';
import coursesReducer from '../courses/slice';

describe('coursesSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        courses: coursesReducer,
      },
    });
  });

  test('should handle fetchCourses.pending', () => {
    store.dispatch(fetchCourses.pending());
    const { status } = store.getState().courses;
    expect(status).toBe('loading');
  });

  test('should handle fetchCourses.fulfilled', () => {
    const courses = [{ id: 1, title: 'Test Course' }];
    store.dispatch(fetchCourses.fulfilled(courses));
    const { status, courses: courseList } = store.getState().courses;
    expect(status).toBe('success');
    expect(courseList).toEqual(courses);
  });

  test('should handle fetchCourses.rejected', () => {
    const error = new Error('Failed to fetch courses');
    store.dispatch(fetchCourses.rejected(error));
    const { status, error: errorMessage } = store.getState().courses;
    expect(status).toBe('error');
    expect(errorMessage).toBeFalsy();
  });
});
