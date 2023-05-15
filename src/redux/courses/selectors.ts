import { RootState } from '../store';

export const selectDetails = (state: RootState) => state.courses.courses;
export const selectStatus = (state: RootState) => state.courses.status;
