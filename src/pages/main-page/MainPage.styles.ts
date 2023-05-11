import { SxProps, Theme } from '@mui/material';

export const mainContainer: SxProps<Theme> = {
  width: '100%',
};
export const coursesContainer: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: '20px',
  width: '100%',
  flexWrap: 'wrap',
  padding: '30px 20px 50px 20px',
};

export const paginate: SxProps<Theme> = {
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  height: '40px',
  marginBottom: '20px',
};
export const card: SxProps<Theme> = {
  display: 'flex',
  textDecoration: 'none',
  color: 'inherit',
};
