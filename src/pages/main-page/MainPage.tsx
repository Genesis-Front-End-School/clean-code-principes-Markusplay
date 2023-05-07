import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Pagination } from '@mui/material';

import CoursesPerPage from '../../components/common/ui/CoursesPerPage';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelect';
import { fetchCourses } from '../../redux/courses/asyncActions';
import { selectDetails } from '../../redux/courses/selectors';
import { Course } from '../../redux/type';
import { COURSES_PER_PAGE_LIMIT } from '../../utils/constants/constants';

import styles from './MainPage.module.scss';

const MainPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const courses: Course[] = useAppSelector(selectDetails)
    .slice()
    .sort(
      (a: any, b: any) =>
        new Date(b.launchDate).valueOf() - new Date(a.launchDate).valueOf(),
    );

  const visitedPages: number = useMemo(() => {
    return (pageNumber - 1) * COURSES_PER_PAGE_LIMIT;
  }, [pageNumber]);

  const pageCount: number = useMemo(() => {
    return Math.ceil(courses?.length / COURSES_PER_PAGE_LIMIT);
  }, [courses?.length]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleChangePage = (_event: ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.mainContainer}>
      <CoursesPerPage
        className={styles.coursesContainer}
        courses={courses}
        coursesLimit={COURSES_PER_PAGE_LIMIT}
        visitedPages={visitedPages}
      />
      <div className={styles.paginate}>
        <Pagination
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
