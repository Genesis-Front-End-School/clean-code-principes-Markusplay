import { FC } from 'react';
import { Box, SxProps, Theme } from '@mui/material';

import { Course } from '../../../../redux/type';
import CourseCard from '../CourseCard';

interface ICoursesPerPageProps {
  courses: Course[];
  visitedPages: number;
  coursesLimit: number;
  sx: SxProps<Theme>;
}

const CoursesPerPage: FC<ICoursesPerPageProps> = ({
  courses,
  visitedPages,
  coursesLimit,
  sx,
}) => {
  return (
    <Box sx={sx}>
      {courses.slice(visitedPages, visitedPages + coursesLimit).map(course => (
        <CourseCard courseData={course} key={course.id} />
      ))}
    </Box>
  );
};

export default CoursesPerPage;
