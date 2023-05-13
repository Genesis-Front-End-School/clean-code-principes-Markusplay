import { useAppDispatch, useAppSelector } from './useSelect';

describe('file with typed hooks ', () => {
  it('all hooks were defined', () => {
    expect(useAppDispatch).toBeDefined();
    expect(useAppSelector).toBeDefined();
  });
});
