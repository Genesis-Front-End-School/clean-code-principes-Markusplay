import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import LessonButton from '../LessonButton';

describe('LessonButton', () => {
  it('renders the button with the given title', () => {
    const handleClick = jest.fn();
    const title = 'Click me';
    const { getByText } = render(
      <LessonButton title={title} handleClick={handleClick} />,
    );
    const buttonElement = getByText(title);
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls the handleClick function when clicked', () => {
    const handleClick = jest.fn();
    const title = 'Click me';
    const { getByText } = render(
      <LessonButton title={title} handleClick={handleClick} />,
    );
    const buttonElement = getByText(title);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalled();
  });
});
