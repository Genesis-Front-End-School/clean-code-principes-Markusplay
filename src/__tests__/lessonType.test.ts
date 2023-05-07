import { Lesson, Lessons, LessonsSliceState } from '../redux/lessons/type';
import { Course, Status } from '../redux/type';

describe('Lessons', () => {
  test('should correctly define the Lessons type', () => {
    const course: Course = {
      id: '1',
      title: 'Test Course',
      tags: [],
      launchDate: '2022-01-01',
      status: 'published',
      description: 'This is a test course',
      duration: 60,
      lessonsCount: 10,
      previewImageLink: '',
      rating: 0,
      containsLockedLessons: false,
      meta: {
        slug: 'test-course',
        courseVideoPreview: {
          link: '',
          duration: 0,
          previewImageLink: '',
        },
      },
    };

    const lesson: Lesson = {
      id: '1',
      title: 'Test Lesson',
      duration: 10,
      order: 1,
      type: 'video',
      status: 'published',
      link: '',
      previewImageLink: '',
      meta: null,
    };

    const lessons: Lessons = {
      ...course,
      lessons: [lesson],
    };

    expect(lessons).toEqual({
      ...course,
      lessons: [lesson],
    });
  });
});

describe('LessonsSliceState', () => {
  test('should correctly define the LessonsSliceState type', () => {
    const lessonsSliceState: LessonsSliceState = {
      status: Status.LOADING,
      lessons: null,
    };

    expect(lessonsSliceState).toEqual({
      status: Status.LOADING,
      lessons: null,
    });
  });
});
