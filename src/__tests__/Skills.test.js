import { render, screen } from '@testing-library/react';

import Skills from '../components/common/ui/CourseCard/components/Skills';

describe('render Skills', () => {
  it('should render a single skill', () => {
    const skills = ['productivity'];
    render(<Skills skills={skills} />);

    expect(screen.getByText('productivity')).toBeInTheDocument();
  });

  it('should render a list of skills', () => {
    const skills = ['React', 'JavaScript', 'CSS'];
    const { getAllByTestId } = render(<Skills skills={skills} />);
    const skillElements = getAllByTestId('skill');
    expect(skillElements).toHaveLength(3);
    expect(skillElements[0].textContent).toEqual('React');
    expect(skillElements[1].textContent).toEqual('JavaScript');
    expect(skillElements[2].textContent).toEqual('CSS');
  });

  it('should render an icon and the text "Skills"', () => {
    const skills = ['React', 'JavaScript', 'CSS'];
    const { getByText, getByTestId } = render(<Skills skills={skills} />);
    expect(getByTestId('autoFixHighIcon')).toBeInTheDocument();
    expect(getByText('Skills')).toBeInTheDocument();
  });

  it('should render an empty list if no skills are provided', () => {
    const skills = [];
    const { queryByTestId } = render(<Skills skills={skills} />);
    expect(queryByTestId('skill')).not.toBeInTheDocument();
  });
});
