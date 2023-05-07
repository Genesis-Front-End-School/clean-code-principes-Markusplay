import { FC } from 'react';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import { Button, Typography } from '@mui/material';

import { ListButtonProps } from '../../ListLessons';

import styles from './EnabledButton.module.scss';

const EnabledButton: FC<ListButtonProps> = ({ title, handleClick }) => {
  return (
    <Button
      color="error"
      variant="contained"
      className={styles.button}
      endIcon={
        <ArrowCircleUpOutlinedIcon
          className={styles.arrowCircleUpOutlinedIcon}
        />
      }
      onClick={handleClick}
    >
      <Typography className={styles.title}>{title}</Typography>
    </Button>
  );
};

export default EnabledButton;
