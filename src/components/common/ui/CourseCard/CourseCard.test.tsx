import { render, screen } from '@testing-library/react';

import { Course } from '../../../../redux/type';
import { testCourseData } from '../../../../utils/__mocks__/mockData';

import CourseCard from '.';
const pauseMock = jest.fn();
const playMock = jest.fn();
describe('CourseCard', () => {
  let courseData: Course;

  beforeAll(() => {
    courseData = testCourseData;
  });

  test('renders course data', () => {
    render(<CourseCard courseData={courseData} />);

    expect(screen.getByText('Course Title')).toBeInTheDocument();
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
    expect(screen.getByText('tatag3g2')).toBeInTheDocument();
    expect(screen.getByText('Course description')).toBeInTheDocument();
    expect(screen.getByText('10 lessons')).toBeInTheDocument();
    expect(screen.getByText('1m 0s')).toBeInTheDocument();
  });

  test('handleMouseLeave pauses video', () => {
    render(<CourseCard courseData={courseData} />);
    const video = screen.getByRole('video');

    video.dispatchEvent(new MouseEvent('mouseenter'));
    video.dispatchEvent(new MouseEvent('mouseleave'));

    expect(playMock).toBeDefined();
    expect(pauseMock).toBeDefined();
  });

  test('handleMouseEnter plays video when video link is not broken', () => {
    render(<CourseCard courseData={courseData} />);
    const video: HTMLVideoElement = screen.getByRole('video');
    video.play = jest.fn();

    video.dispatchEvent(new MouseEvent('mouseenter'));

    video.dispatchEvent(new Event('manifestParsed'));

    expect(video.play).toHaveBeenCalledTimes(0);
  });
});

jest.mock('hls.js');
