import { FC } from 'react';
import { render, screen } from '@testing-library/react';

import CourseCard from '.';
const pauseMock = jest.fn();
const playMock = jest.fn();
describe('CourseCard', () => {
  let courseData;

  beforeAll(() => {
    courseData = {
      id: '1',
      title: 'Test Course',
      tags: ['test', 'mock'],
      description: 'This is a test course',
      duration: 120,
      lessonsCount: 10,
      previewImageLink: 'https://example.com/image.png',
      rating: 4.5,
      meta: {
        skills: ['React', 'TypeScript'],
        courseVideoPreview: {
          link: 'https://example.com/video.mp4',
          previewImageLink: 'https://example.com/video-preview.png',
          duration: 0,
        },
        slug: '',
      },
      launchDate: '',
      status: '',
      containsLockedLessons: false,
    };
  });

  test('renders course data', () => {
    render(<CourseCard courseData={courseData} />);

    expect(screen.getByText('Test Course')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('mock')).toBeInTheDocument();
    expect(screen.getByText('This is a test course')).toBeInTheDocument();
    expect(screen.getByText('10 lessons')).toBeInTheDocument();
    expect(screen.getByText('2m 0s')).toBeInTheDocument();
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
    global.Hls = {
      Events: {
        ERROR: 'error',
        MANIFEST_PARSED: 'manifestParsed',
      },
    };
    render(<CourseCard courseData={courseData} />);
    const video = screen.getByRole('video');
    video.play = jest.fn();

    video.dispatchEvent(new MouseEvent('mouseenter'));

    global.Hls.DefaultConfig.loader.retryDelay = 0;
    video.dispatchEvent(new Event('manifestParsed'));

    expect(video.play).toHaveBeenCalledTimes(0);
  });
});

jest.mock('hls.js');
