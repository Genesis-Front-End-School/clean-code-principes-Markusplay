import { Lessons } from '../redux/lessons/type';

export const getDate = (lessons: Lessons | null) => {
  return lessons?.launchDate
    ? new Date(lessons?.launchDate).toLocaleDateString('en-GB')
    : 'No date available';
};
