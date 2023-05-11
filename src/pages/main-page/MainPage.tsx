import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { Box, Pagination } from '@mui/material';
import { Switch } from '@mui/material';

import CoursesPerPage from '../../components/common/ui/CoursesPerPage';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelect';
import { fetchCourses } from '../../redux/courses/asyncActions';
import { selectDetails } from '../../redux/courses/selectors';
import { Course } from '../../redux/type';
import { COURSES_PER_PAGE_LIMIT } from '../../utils/constants/constants';
import { sortCourses } from '../../utils/sortCourses';

import * as styles from './MainPage.styles';

const MainPage = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const courses: Course[] = useAppSelector(selectDetails);
  const sortedCourses: Course[] = sortCourses(courses);

  const visitedPages = useMemo(() => {
    return (pageNumber - 1) * COURSES_PER_PAGE_LIMIT;
  }, [pageNumber]);

  const pageCount = useMemo(() => {
    return Math.ceil(sortedCourses?.length / COURSES_PER_PAGE_LIMIT);
  }, [sortedCourses?.length]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleChangePage = (_event: ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
    window.scrollTo(0, 0);
  };

  return (
    <Box sx={styles.mainContainer}>
      <CoursesPerPage
        sx={styles.coursesContainer}
        courses={sortedCourses}
        coursesLimit={COURSES_PER_PAGE_LIMIT}
        visitedPages={visitedPages}
      />
      <Box sx={styles.paginate}>
        <Pagination
          role="navigation"
          count={pageCount}
          page={pageNumber}
          onChange={handleChangePage}
          size="large"
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default MainPage;
