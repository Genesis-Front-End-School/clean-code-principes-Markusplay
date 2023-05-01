import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Pagination } from '@mui/material';

import CoursesPerPage from '@/components/common/ui/CoursePerPage/CoursesPerPage';
import { useAppDispatch, useAppSelector } from '@/hooks/useSelect';
import { fetchCourses } from '@/redux/courses/asyncActions';
import { selectDetails } from '@/redux/courses/selectors';
import { Course } from '@/redux/type';
import { Courses_Per_Page_Limit } from '@/utils/constants/constants';

import styles from './MainPage.module.scss';

const MainPage = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const courses: Course[] = useAppSelector(selectDetails)
    .slice()
    .sort(
      (a, b) =>
        new Date(b.launchDate).valueOf() - new Date(a.launchDate).valueOf(),
    );

  const visitedPages: number = useMemo(() => {
    return (pageNumber - 1) * Courses_Per_Page_Limit;
  }, [pageNumber]);

  const pageCount: number = useMemo(() => {
    return Math.ceil(courses?.length / Courses_Per_Page_Limit);
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
        coursesLimit={Courses_Per_Page_Limit}
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
