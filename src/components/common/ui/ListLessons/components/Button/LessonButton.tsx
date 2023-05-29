import { FC } from 'react';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import BlockIcon from '@mui/icons-material/Block';
import { Button, Typography } from '@mui/material';

import styles from './LessonButton.module.scss';

interface ListButtonProps {
  title: string;
  handleClick: () => void;
  disabled?: boolean;
}

const LessonButton: FC<ListButtonProps> = ({
  title,
  handleClick,
  disabled = false,
}) => {
  return (
    <>
      {disabled ? (
        <Button
          className={styles.button}
          disabled={true}
          endIcon={<BlockIcon className={styles.blockIcon} />}
          onClick={handleClick}
        >
          <Typography className={styles.title}>{title}</Typography>
        </Button>
      ) : (
        <Button
          variant="contained"
          className="button"
          endIcon={
            <ArrowCircleUpOutlinedIcon
              className={styles.arrowCircleUpOutlinedIcon}
            />
          }
          onClick={handleClick}
        >
          <Typography className={styles.title}>{title}</Typography>
        </Button>
      )}
    </>
  );
};

export default LessonButton;
