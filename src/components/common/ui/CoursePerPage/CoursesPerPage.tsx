import React, { FC } from 'react';

import { Course } from '@/redux/type';

import CourseCard from '../CourseCard';

interface CoursesPerPageProps {
  courses: Course[];
  pagesVisited: number;
  coursesPerPage: number;
  className: string;
}

const CoursesPerPage: FC<CoursesPerPageProps> = ({
  courses,
  pagesVisited,
  coursesPerPage,
  className,
}) => {
  return (
    <div className={className}>
      {courses
        .slice(pagesVisited, pagesVisited + coursesPerPage)
        .map(course => (
          <CourseCard
            id={course.id}
            key={course.id}
            title={course.title}
            description={course.description}
            duration={course.duration}
            image={course.previewImageLink}
            lessonsCount={course.lessonsCount}
            skills={course.meta.skills}
            rating={course.rating}
            tags={course.tags}
            videoPreviewLink={course.meta.courseVideoPreview?.link}
            videoPreviewImageLink={
              course.meta.courseVideoPreview?.previewImageLink
            }
          />
        ))}
    </div>
  );
};

export default CoursesPerPage;
