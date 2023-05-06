export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type CourseVideoPreview = {
  link: string;
  duration: number;
  previewImageLink: string;
};

export type CourseMeta = {
  fullCourseProductId?: string;
  fullCourseProductFamily?: string;
  slug: string;
  skills?: string[];
  courseVideoPreview: CourseVideoPreview;
};

export type Course = {
  id: string;
  title: string;
  tags: string[];
  launchDate: string;
  status: string;
  description: string;
  duration: number;
  lessonsCount: number;
  previewImageLink: string;
  rating: number;
  containsLockedLessons: boolean;
  meta: CourseMeta;
};
