import { FC } from 'react';

import { Course } from '../../../../redux/type';
import CourseCard from '../CourseCard';

interface CoursesPerPageProps {
  courses: Course[];
  visitedPages: number;
  coursesLimit: number;
  className: string;
}

const CoursesPerPage: FC<CoursesPerPageProps> = ({
  courses,
  visitedPages,
  coursesLimit,
  className,
}) => {
  return (
    <div className={className}>
      {courses.slice(visitedPages, visitedPages + coursesLimit).map(course => (
        <CourseCard courseData={course} key={course.id} />
      ))}
    </div>
  );
};

export default CoursesPerPage;
