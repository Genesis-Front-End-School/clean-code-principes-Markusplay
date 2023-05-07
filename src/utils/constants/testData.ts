import {
  Course,
  CourseMeta,
  CourseVideoPreview,
  Status,
} from '../../redux/type';

export const testCourseData: Course = {
  id: '12345',
  title: 'Course Title',
  tags: ['tag1', 'tag2', 'tag3'],
  launchDate: '2022-05-01',
  status: Status.SUCCESS,
  description: 'Course description',
  duration: 60,
  lessonsCount: 10,
  previewImageLink: 'https://example.com/preview.png',
  rating: 4.5,
  containsLockedLessons: false,
  meta: {
    fullCourseProductId: '12345',
    fullCourseProductFamily: 'example',
    slug: 'course-slug',
    skills: ['skill1', 'skill2', 'skill3'],
    courseVideoPreview: {
      link: 'https://example.com/video.mp4',
      duration: 120,
      previewImageLink: 'https://example.com/preview.png',
    },
  },
};

export const testCoursesData: Course[] = [
  {
    id: '12345',
    title: 'Course Title',
    tags: ['tag1', 'tag2', 'tag3'],
    launchDate: '2022-05-01',
    status: Status.SUCCESS,
    description: 'Course description',
    duration: 60,
    lessonsCount: 10,
    previewImageLink: 'https://example.com/preview.png',
    rating: 4.5,
    containsLockedLessons: false,
    meta: {
      fullCourseProductId: '12345',
      fullCourseProductFamily: 'example',
      slug: 'course-slug',
      skills: ['skill1', 'skill2', 'skill3'],
      courseVideoPreview: {
        link: 'https://example.com/video.mp4',
        duration: 120,
        previewImageLink: 'https://example.com/preview.png',
      },
    },
  },
  {
    id: '678',
    title: 'Course Title 2',
    tags: ['tag4', 'tag5', 'tag6'],
    launchDate: '2023-05-01',
    status: Status.LOADING,
    description: 'Course description 2',
    duration: 120,
    lessonsCount: 20,
    previewImageLink: 'https://example.com/preview_2.png',
    rating: 5,
    containsLockedLessons: true,
    meta: {
      fullCourseProductId: '678',
      fullCourseProductFamily: 'example_2',
      slug: 'course-slug_2',
      skills: ['skill4', 'skill5', 'skill6'],
      courseVideoPreview: {
        link: 'https://example.com/video_2.mp4',
        duration: 240,
        previewImageLink: 'https://example.com/preview_@.png',
      },
    },
  },
];

export const testMetaData: CourseMeta = {
  fullCourseProductId: '12345',
  fullCourseProductFamily: 'example',
  slug: 'course-slug',
  skills: ['skill1', 'skill2', 'skill3'],
  courseVideoPreview: {
    link: 'https://example.com/video.mp4',
    duration: 120,
    previewImageLink: 'https://example.com/preview.png',
  },
};

export const testVideoPreviewData: CourseVideoPreview = {
  link: 'https://example.com/video.mp4',
  duration: 120,
  previewImageLink: 'https://example.com/preview.png',
};
