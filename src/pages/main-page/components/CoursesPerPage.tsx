import { FC } from 'react';
import dynamic from 'next/dynamic';

import { Course } from '../../../redux/type';

const CourseCard = dynamic(
  () => import('../../../components/common/ui/CourseCard'),
);

interface ICoursesPerPageProps {
  courses: Course[];
  visitedPages: number;
  coursesLimit: number;
  className: any;
}

const CoursesPerPage: FC<ICoursesPerPageProps> = ({
  courses,
  visitedPages,
  coursesLimit,
  className,
}) => {
  return (
    <div className={className}>
      {courses.slice(visitedPages, visitedPages + coursesLimit).map(course => (
        <CourseCard key={course.id} courseData={course} />
      ))}
    </div>
  );
};

export default CoursesPerPage;
