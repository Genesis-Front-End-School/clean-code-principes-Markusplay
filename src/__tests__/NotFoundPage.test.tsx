import { render, screen } from '@testing-library/react';

import NotFoundPage from '../pages/404-page/NotFoundPage';

it('should render a title and a button', () => {
  render(<NotFoundPage />);

  expect(
    screen.getByText('Упс! 404 помилка. Сторінку не знайдено.'),
  ).toBeInTheDocument();

  expect(
    screen.getByRole('button', { name: 'Повернутися на головну' }),
  ).toBeInTheDocument();
});
