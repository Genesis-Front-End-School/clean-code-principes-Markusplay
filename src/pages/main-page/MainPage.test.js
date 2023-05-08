import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import MainPage from './MainPage';

jest.mock('../../redux/courses/asyncActions', () => ({
  fetchCourses: jest.fn(),
}));

const mockStore = configureStore([thunk]);

describe('MainPage', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      courses: {
        details: [
          { id: 1, title: 'Course 1', launchDate: '2022-01-01' },
          { id: 2, title: 'Course 2', launchDate: '2022-01-02' },
          { id: 3, title: 'Course 3', launchDate: '2022-01-03' },
          { id: 4, title: 'Course 4', launchDate: '2022-01-04' },
          { id: 5, title: 'Course 5', launchDate: '2022-01-05' },
          { id: 6, title: 'Course 6', launchDate: '2022-01-06' },
          { id: 7, title: 'Course 7', launchDate: '2022-01-07' },
          { id: 8, title: 'Course 8', launchDate: '2022-01-08' },
          { id: 9, title: 'Course 9', launchDate: '2022-01-09' },
          { id: 10, title: 'Course 10', launchDate: '2022-01-10' },
        ],
      },
    });
  });

  it('should fetch courses on mount', () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>,
    );

    expect(fetchCourses).toHaveBeenCalledTimes(1);
  });

  it('should render a pagination component', () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>,
    );

    const pagination = screen.getByRole('navigation');
    expect(pagination).toBeInTheDocument();
  });
});
