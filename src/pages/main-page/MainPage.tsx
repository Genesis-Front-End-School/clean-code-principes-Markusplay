import { ChangeEvent, useEffect, useState } from 'react';
import { Pagination } from '@mui/material';

import CoursesPerPage from '@/components/common/ui/CoursePerPage/CoursesPerPage';
import { useAppDispatch, useAppSelector } from '@/hooks/useSelect';
import { fetchCourses } from '@/redux/courses/asyncActions';
import { selectDetails } from '@/redux/courses/selectors';

import styles from './MainPage.module.scss';

const MainPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const courses = useAppSelector(selectDetails)
    .slice()
    .sort(
      (a, b) =>
        new Date(b.launchDate).valueOf() - new Date(a.launchDate).valueOf(),
    );
  const coursesPerPage = 10;
  const visitedPages = (pageNumber - 1) * coursesPerPage;
  const pageCount = Math.ceil(courses?.length / coursesPerPage);
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
        coursesPerPage={coursesPerPage}
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
