import { fireEvent, render } from '@testing-library/react';

import EnabledButton from '../components/common/ui/ListLessons/components/EnabledButton/EnabledButton';

describe('EnabledButton', () => {
  it('should render the button with the correct text and icon', () => {
    const title = 'Click me';
    const handleClick = jest.fn();
    const { getByRole } = render(
      <EnabledButton title={title} handleClick={handleClick} />,
    );

    const button = getByRole('button');
    expect(button).toHaveTextContent(title);
  });

  it('should call the handleClick function when clicked', () => {
    const title = 'Click me';
    const handleClick = jest.fn();
    const { getByRole } = render(
      <EnabledButton title={title} handleClick={handleClick} />,
    );

    const button = getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });
});
