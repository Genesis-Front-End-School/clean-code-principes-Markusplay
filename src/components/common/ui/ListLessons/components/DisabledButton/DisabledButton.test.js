import { render } from '@testing-library/react';

import DisabledButton from './DisabledButton';

describe('DisabledButton', () => {
  it('renders the button with the correct title and icon', () => {
    const mockHandleClick = jest.fn();
    const { getByRole, getByText } = render(
      <DisabledButton title="Button Title" handleClick={mockHandleClick} />,
    );
    const buttonElement = getByRole('button');
    const titleElement = getByText('Button Title');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('disabled');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Button Title');
  });

  it('calls the handleClick function when clicked', () => {
    const mockHandleClick = jest.fn();
    const { getByRole } = render(
      <DisabledButton title="Button Title" handleClick={mockHandleClick} />,
    );
    const buttonElement = getByRole('button');

    buttonElement.click();
    expect(mockHandleClick).not.toHaveBeenCalled();
  });
});
