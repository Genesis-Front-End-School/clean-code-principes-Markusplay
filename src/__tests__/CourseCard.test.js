import { render, screen } from '@testing-library/react';

import CourseCard from '../components/common/ui/CourseCard';

describe('CourseCard', () => {
  it('renders course data', () => {
    const mockCourseData = {
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
    render(<CourseCard courseData={mockCourseData} />);

    expect(screen.getByText('Test Course')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('mock')).toBeInTheDocument();
    expect(screen.getByText('This is a test course')).toBeInTheDocument();
    expect(screen.getByText('10 lessons')).toBeInTheDocument();
    expect(screen.getByText('2m 0s')).toBeInTheDocument();
  });

  it('should show text for buttons', () => {});
});
