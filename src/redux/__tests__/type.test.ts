import { testCourseData } from '../../utils/constants/testData';
import { CoursesSliceState } from '../courses/type';
import { FetchLessonsParams, Lesson, Lessons } from '../lessons/type';
import { Course, CourseMeta, Status } from '../type';

const CourseMetaMock = {
  slug: 'slug',
  skills: ['skill1', 'skill2'],
  fullCourseProductId: '666',
  fullCourseProductFamily: 'hell',
  courseVideoPreview: {
    link: 'link',
    duration: 777,
    previewImageLink: 'link',
  },
};

const CourseMock = testCourseData;

const CoursesSliceStateMock = {
  status: Status.SUCCESS,
  courses: [CourseMock],
  currentPage: 1,
};

const LessonMock = {
  id: 'string',
  title: 'string',
  duration: 666,
  order: 10,
  type: 'string',
  status: 'string',
  link: 'string',
  previewImageLink: 'string',
  meta: null,
};

const LessonsMock = {
  ...CourseMock,
  lessons: [LessonMock],
};

const FetchLessonsParamsMock = {
  id: 'id',
};

function courseMetaTestFunction(CourseMetaParam: CourseMeta) {
  return CourseMetaParam;
}

function CourseTestFunction(CourseParam: Course) {
  return CourseParam;
}

function CoursesSliceStateTestFunction(
  CoursesSliceStateParam: CoursesSliceState,
) {
  return CoursesSliceStateParam;
}

function LessonTestFunction(LessonParam: Lesson) {
  return LessonParam;
}

function LessonsTestFunction(LessonsParam: Lessons) {
  return LessonsParam;
}

function FetchLessonsParamsTestFunction(
  FetchLessonsParamsParam: FetchLessonsParams,
) {
  return FetchLessonsParamsParam;
}

describe('file in the redux directory with all global types', () => {
  it('has all enums', () => {
    expect(Status).toBeDefined();
  });

  it('has all types', () => {
    const CourseMetaResult: CourseMeta = courseMetaTestFunction(CourseMetaMock);
    expect(CourseMetaResult).toBeDefined();

    const CourseResult: Course = CourseTestFunction(CourseMock);
    expect(CourseResult).toBeDefined();
  });
});

describe('file for exporting course slice types', () => {
  it('has all interfaces', () => {
    const CoursesSliceStateResult: CoursesSliceState =
      CoursesSliceStateTestFunction(CoursesSliceStateMock);
    expect(CoursesSliceStateResult).toBeDefined();
  });
});

describe('file for exporting course slice types', () => {
  it('has all interfaces and types', () => {
    const LessonResult: Lesson = LessonTestFunction(LessonMock);
    expect(LessonResult).toBeDefined();

    const LessonsResult: Lessons = LessonsTestFunction(LessonsMock);
    expect(LessonsResult).toBeDefined();

    const FetchLessonsParamsResult: FetchLessonsParams =
      FetchLessonsParamsTestFunction(FetchLessonsParamsMock);
    expect(FetchLessonsParamsResult).toBeDefined();
  });
});
