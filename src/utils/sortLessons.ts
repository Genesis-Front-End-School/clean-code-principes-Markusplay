import { Lesson } from '../redux/lessons/type';

export const sortLessons = (lessons: Lesson[] | undefined) => {
  if (lessons) {
    return lessons.slice().sort((a, b) => a.order - b.order);
  }
  return [];
};
