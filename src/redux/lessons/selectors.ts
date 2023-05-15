import { RootState } from '../store';

export const selectDetails = (state: RootState) => state.lessons.lessons;
export const selectStatus = (state: RootState) => state.lessons.status;
