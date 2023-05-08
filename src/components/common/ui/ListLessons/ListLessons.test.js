import { fireEvent, render, screen } from '@testing-library/react';

import ListLessons from '.';

it('should render props correctly', () => {
  render(
    <ListLessons
      title="title test"
      previewImageLink="https://example.com/image.jpg"
      disabled={false}
      order={1}
      duration={120}
      setCurrentLesson={jest.fn()}
    />,
  );

  expect(screen.getByText('title test')).toBeInTheDocument();
});

it('should call setCurrentLesson and scroll to top when enabled button is clicked', () => {
  const order = 2;
  const setCurrentLesson = jest.fn();
  window.scrollTo = jest.fn();

  render(
    <ListLessons
      title="video"
      previewImageLink="https://example.com/image.jpg"
      setCurrentLesson={setCurrentLesson}
      disabled={false}
      order={order}
      duration={120}
    />,
  );

  const enabledButton = screen.getByRole('button', { name: 'video' });
  fireEvent.click(enabledButton);

  expect(setCurrentLesson).toHaveBeenCalledWith(order - 1);
  expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
});
