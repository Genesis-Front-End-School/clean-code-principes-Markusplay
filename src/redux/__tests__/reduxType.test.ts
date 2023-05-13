import {
  testCourseData,
  testMetaData,
  testVideoPreviewData,
} from '../../utils/__mocks__/mockData';
import { Course, CourseMeta, CourseVideoPreview, Status } from '../type';

describe('Redux types', () => {
  it('CourseVideoPreview should have the correct properties', () => {
    const preview: CourseVideoPreview = testVideoPreviewData;

    expect(preview.link).toBe('https://example.com/video.mp4');
    expect(preview.duration).toBe(120);
    expect(preview.previewImageLink).toBe('https://example.com/preview.png');
  });

  it('CourseMeta should have the correct properties', () => {
    const meta: CourseMeta = testMetaData;

    expect(meta.fullCourseProductId).toBe('12345');
    expect(meta.fullCourseProductFamily).toBe('example');
    expect(meta.slug).toBe('course-slug');
    expect(meta.skills).toEqual(['skill1', 'skill2', 'skill3']);
    expect(meta.courseVideoPreview.link).toBe('https://example.com/video.mp4');
    expect(meta.courseVideoPreview.duration).toBe(120);
    expect(meta.courseVideoPreview.previewImageLink).toBe(
      'https://example.com/preview.png',
    );
  });

  it('Course should have the correct properties', () => {
    const course: Course = testCourseData;

    expect(course.id).toBe('12345');
    expect(course.title).toBe('Course Title');
    expect(course.tags).toEqual(['tag1', 'tag2', 'tag3']);
    expect(course.launchDate).toBe('2022-05-01');
    expect(course.status).toBe(Status.SUCCESS);
    expect(course.description).toBe('Course description');
    expect(course.duration).toBe(60);
    expect(course.lessonsCount).toBe(10);
    expect(course.previewImageLink).toBe('https://example.com/preview.png');
    expect(course.rating).toBe(4.5);
    expect(course.containsLockedLessons).toBe(false);
    expect(course.meta.slug).toBe('course-slug');
    expect(course.meta.skills).toEqual(['skill1', 'skill2', 'skill3']);
    expect(course.meta.courseVideoPreview.link).toBe(
      'https://example.com/video.mp4',
    );
    expect(course.meta.courseVideoPreview.duration).toBe(120);
    expect(course.meta.courseVideoPreview.previewImageLink).toBe(
      'https://example.com/preview.png',
    );
  });
});
