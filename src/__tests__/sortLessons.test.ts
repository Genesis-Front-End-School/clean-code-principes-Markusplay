import { Lesson } from '../redux/lessons/type';
import { sortLessons } from '../utils/sortLessons';

describe('sort lessons correctly', () => {
  it('should sort correctly lessons', () => {
    const unsortedLessons = [
      {
        id: '2',
        title: '2',
        duration: 2,
        order: 2,
        type: '2',
        status: '',
        link: 'second link',
        previewImageLink: 'second link',
        meta: null,
      },
      {
        id: '1',
        title: 'test 1',
        duration: 1,
        order: 1,
        type: 'video',
        status: 'unlocked',
        link: 'first link',
        previewImageLink: 'first link',
        meta: null,
      },
    ];
    const sortedLessons = [
      {
        id: '1',
        title: 'test 1',
        duration: 1,
        order: 1,
        type: 'video',
        status: 'unlocked',
        link: 'first link',
        previewImageLink: 'first link',
        meta: null,
      },
      {
        id: '2',
        title: '2',
        duration: 2,
        order: 2,
        type: '2',
        status: '',
        link: 'second link',
        previewImageLink: 'second link',
        meta: null,
      },
    ];
    const sorted = sortLessons(unsortedLessons);

    expect(sorted).toEqual(sortedLessons);
  });

  it('should return empty array if passed empty array of lessons', () => {
    const unsortedLessons: Lesson[] = [];
    const sorted = sortLessons(unsortedLessons);

    expect(sorted).toEqual([]);
  });

  it('should return empty array if passed undefined', () => {
    const unsortedLessons = undefined;
    const sorted = sortLessons(unsortedLessons);

    expect(sorted).toEqual([]);
  });

  it('should not sort sorted array', () => {
    const sortedLessons = [
      {
        id: '1',
        title: 'test 1',
        duration: 1,
        order: 1,
        type: 'video',
        status: 'unlocked',
        link: 'first link',
        previewImageLink: 'first link',
        meta: null,
      },
      {
        id: '2',
        title: '2',
        duration: 2,
        order: 2,
        type: '2',
        status: '',
        link: 'second link',
        previewImageLink: 'second link',
        meta: null,
      },
    ];
    const sorted = sortLessons(sortedLessons);

    expect(sorted).toEqual(sortedLessons);
  });
});
