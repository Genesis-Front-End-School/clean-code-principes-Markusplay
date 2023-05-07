import { FC } from 'react';
import BlockIcon from '@mui/icons-material/Block';
import { Button, Typography } from '@mui/material';

import { ListButtonProps } from '../../ListLessons';

import styles from './DisabledButton.module.scss';

const DisabledButton: FC<ListButtonProps> = ({ title, handleClick }) => {
  return (
    <Button
      className={styles.button}
      disabled={true}
      endIcon={<BlockIcon className={styles.blockIcon} />}
      onClick={handleClick}
    >
      <Typography className={styles.title}>{title}</Typography>
    </Button>
  );
};

export default DisabledButton;
