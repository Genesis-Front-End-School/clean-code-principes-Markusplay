import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import { useAppSelector } from '../../hooks/useSelect';

import CoursePage from './CoursePage';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@mui/icons-material/CalendarToday');

jest.mock('react');
jest.mock('@mui/icons-material');

jest.mock('../../hooks/useSelect', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

describe('CoursePage', () => {
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseAppSelector = useAppSelector as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      query: {
        courseId: 'mock-course-id',
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the title of the course', () => {
    mockUseAppSelector.mockReturnValue({
      title: 'Mock Course Title',
      lessons: [
        {
          id: 'mock-lesson-1',
          title: 'Mock Lesson 1 Title',
          duration: 60,
          order: 1,
          type: 'video',
          status: 'unlocked',
          link: 'https://example.com/mock-lesson-1.mp4',
          previewImageLink: 'https://example.com/mock-lesson-1-preview.jpg',
        },
        {
          id: 'mock-lesson-2',
          title: 'Mock Lesson 2 Title',
          duration: 120,
          order: 2,
          type: 'video',
          status: 'unlocked',
          link: 'https://example.com/mock-lesson-2.mp4',
          previewImageLink: 'https://example.com/mock-lesson-2-preview.jpg',
        },
      ],
    });

    render(<CoursePage />);

    expect(screen.getByText('Mock Course Title')).toBeInTheDocument();
  });

  test('renders the video player with the correct poster image', () => {
    mockUseAppSelector.mockReturnValue({
      title: 'Mock Course Title',
      lessons: [
        {
          id: 'mock-lesson-1',
          title: 'Mock Lesson 1 Title',
          duration: 60,
          order: 1,
          type: 'video',
          status: 'unlocked',
          link: 'https://example.com/mock-lesson-1.mp4',
          previewImageLink: 'https://example.com/mock-lesson-1-preview.jpg',
        },
        {
          id: 'mock-lesson-2',
          title: 'Mock Lesson 2 Title',
          duration: 120,
          order: 2,
          type: 'video',
          status: 'unlocked',
          link: 'https://example.com/mock-lesson-2.mp4',
          previewImageLink: 'https://example.com/mock-lesson-2-preview.jpg',
        },
      ],
    });

    render(<CoursePage />);

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://example.com/mock-lesson-1-preview.jpg/lesson-1.webp',
    );
  });
});
