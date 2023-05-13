import {
  sortedTestCoursesData,
  unsortedCoursesData,
} from '../__mocks__/mockData';
import { sortCourses } from '../sortCourses';

describe('sort courses correctly', () => {
  it('should sort correctly courses', () => {
    const sorted = sortCourses(unsortedCoursesData);

    expect(sorted).toEqual(sortedTestCoursesData);
  });

  it('should return empty array if passed empty array of courses', () => {
    const sorted = sortCourses(undefined);

    expect(sorted).toEqual([]);
  });

  it('should sort correctly courses', () => {
    const sorted = sortCourses(sortedTestCoursesData);

    expect(sorted).toEqual(sortedTestCoursesData);
  });
});
