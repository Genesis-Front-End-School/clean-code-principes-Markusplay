import { testCoursesData } from '../../utils/constants/testData';
import { Status } from '../type';

import { CoursesSliceState } from './type';

describe('Courses Type', () => {
  it('should render courses', () => {
    const preview: CoursesSliceState = {
      status: Status.SUCCESS,
      courses: testCoursesData,
      Error: 'first error',
    };

    expect(preview.status).toBe(Status.SUCCESS);
    for (let index = 0; index < preview.courses.length; index++) {
      expect(preview.courses[index].id).toBe(preview.courses[index].id);
      expect(preview.courses[index].title).toBe(testCoursesData[index].title);
      expect(preview.courses[index].tags).toEqual(testCoursesData[index].tags);
      expect(preview.courses[index].launchDate).toBe(
        testCoursesData[index].launchDate,
      );
      expect(preview.courses[index].status).toBe(testCoursesData[index].status);
      expect(preview.courses[index].description).toBe(
        testCoursesData[index].description,
      );
      expect(preview.courses[index].duration).toBe(
        testCoursesData[index].duration,
      );
      expect(preview.courses[index].lessonsCount).toBe(
        testCoursesData[index].lessonsCount,
      );
      expect(preview.courses[index].previewImageLink).toBe(
        testCoursesData[index].previewImageLink,
      );
      expect(preview.courses[index].rating).toBe(testCoursesData[index].rating);
      expect(preview.courses[index].containsLockedLessons).toBe(
        testCoursesData[index].containsLockedLessons,
      );
      expect(preview.courses[index].meta.slug).toBe(
        testCoursesData[index].meta.slug,
      );
      expect(preview.courses[index].meta.skills).toEqual(
        testCoursesData[index].meta.skills,
      );
      expect(preview.courses[index].meta.courseVideoPreview.link).toBe(
        testCoursesData[index].meta.courseVideoPreview.link,
      );
      expect(preview.courses[index].meta.courseVideoPreview.duration).toBe(
        testCoursesData[index].meta.courseVideoPreview.duration,
      );
      expect(
        preview.courses[index].meta.courseVideoPreview.previewImageLink,
      ).toBe(testCoursesData[index].meta.courseVideoPreview.previewImageLink);
    }
    expect(preview.Error).toBe('first error');
  });
});
