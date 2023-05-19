import { Lesson } from '../redux/lessons/type';

export const sortLessons = (lessons: Lesson[] | undefined):Lesson[] => {
  if (lessons) {
    return lessons.slice().sort((a: Lesson, b: Lesson) => a.order - b.order);
  }
  return [];
};
