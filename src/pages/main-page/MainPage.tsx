import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Pagination } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/useSelect';
import { fetchCourses } from '../../redux/courses/asyncActions';
import { selectDetails } from '../../redux/courses/selectors';
import { Course } from '../../redux/type';
import { COURSES_PER_PAGE_LIMIT } from '../../utils/constants/constants';
import { sortCourses } from '../../utils/sortCourses';

import CoursesPerPage from './components';

import styles from './MainPage.module.scss';

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
  });

  const handleChangePage = (_event: ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.mainContainer}>
      <CoursesPerPage
        className={styles.coursesContainer}
        courses={sortedCourses}
        coursesLimit={COURSES_PER_PAGE_LIMIT}
        visitedPages={visitedPages}
      />
      <div className={styles.paginate}>
        <Pagination
          role="navigation"
          count={pageCount}
          page={pageNumber}
          onChange={handleChangePage}
          size="large"
          color="primary"
        />
      </div>
    </div>
  );
};

export default MainPage;
