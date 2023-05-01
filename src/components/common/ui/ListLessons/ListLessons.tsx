import React, { Dispatch, FC, SetStateAction } from 'react';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import BlockIcon from '@mui/icons-material/Block';
import { Button } from '@mui/material';

import styles from './ListLessons.module.scss';

export interface ListLessonsProps {
  title: string;
  previewImageLink: string;
  setCurrentLesson: Dispatch<SetStateAction<number>>;
  disabled: boolean;
  order: number;
  duration: number;
}

const ListLessons: FC<ListLessonsProps> = ({
  title = 'video',
  previewImageLink,
  setCurrentLesson,
  disabled,
  order,
  duration,
}) => {
  const minutes: number = Math.floor(duration / 60);
  const seconds: number = duration - minutes * 60;

  const handleClick = () => {
    setCurrentLesson(order - 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.list}>
      {disabled ? (
        <Button
          className={styles.button}
          disabled={disabled}
          endIcon={<BlockIcon className={styles.blockIcon} />}
          onClick={handleClick}
        >
          <p className={styles.title}>{title}</p>
        </Button>
      ) : (
        <div className={styles.item}>
          <video
            className={styles.video}
            poster={previewImageLink ? previewImageLink : './not-found.png'}
          />
          <div className={styles.time}>
            <AccessTimeFilledIcon />
            {minutes}m {seconds}s
          </div>
          <Button
            color="error"
            variant="contained"
            className={styles.button}
            disabled={disabled}
            endIcon={
              <ArrowCircleUpOutlinedIcon
                className={styles.arrowCircleUpOutlinedIcon}
              />
            }
            onClick={handleClick}
          >
            <p className={styles.title}>{title}</p>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ListLessons;
