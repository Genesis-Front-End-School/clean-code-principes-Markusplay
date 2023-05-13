import CourseCard from '../components/common/ui/CourseCard';
import CoursesPerPage from '../components/common/ui/CoursesPerPage';
import ListLessons from '../components/common/ui/ListLessons';
import NotFoundPage from '../pages/404-page';
import CoursePage from '../pages/course-page';
import MainPage from '../pages/main-page';

describe('page indexes', () => {
  it('should define NotFoundPage', () => {
    expect(NotFoundPage).toBeDefined();
  });

  it('should be define CoursePage', () => {
    expect(CoursePage).toBeDefined();
  });

  it('should be define MainPage', () => {
    expect(MainPage).toBeDefined();
  });
});

describe('component indexes', () => {
  it('should define CourseCard', () => {
    expect(CourseCard).toBeDefined();
  });

  it('should be define ListLessons', () => {
    expect(ListLessons).toBeDefined();
  });

  it('should be define CoursePerPage', () => {
    expect(CoursesPerPage).toBeDefined();
  });
});
