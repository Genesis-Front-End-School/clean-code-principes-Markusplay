import { render } from '@testing-library/react';
import { useRouter } from 'next/router';

import Course from './[courseId]';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

it('should render CoursePage', () => {
  (useRouter as jest.Mock).mockReturnValue({
    query: { courseId: '1' },
  });
  const component = render(<Course />);

  expect(component).toBeDefined();
});