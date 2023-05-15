import { Lesson } from '../../redux/lessons/type';
import {
  mockedSortedLessons,
  mockedUnsortedLessons,
} from '../__mocks__/mockData';
import { sortLessons } from '../sortLessons';

describe('sort lessons correctly', () => {
  it('should sort correctly lessons', () => {
    const sorted = sortLessons(mockedUnsortedLessons);

    expect(sorted).toEqual(mockedSortedLessons);
  });

  it('should return empty array if passed empty array of lessons', () => {
    const unsortedLessons: Lesson[] = [];
    const sorted = sortLessons(unsortedLessons);

    expect(sorted).toEqual([]);
  });

  it('should return empty array if passed undefined', () => {
    const sorted = sortLessons(undefined);

    expect(sorted).toEqual([]);
  });

  it('should not sort sorted array', () => {
    const sortResult = sortLessons(mockedSortedLessons);

    expect(sortResult).toEqual(mockedSortedLessons);
  });
});
