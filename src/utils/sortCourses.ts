import { Course } from '../redux/type';

export const sortCourses = (courses: Course[] | undefined): Course[] => {
  if (courses) {
    return courses
      ?.slice()
      .sort(
        (a: Course, b: Course) =>
          new Date(b.launchDate).valueOf() - new Date(a.launchDate).valueOf(),
      );
  }
  return [];
};