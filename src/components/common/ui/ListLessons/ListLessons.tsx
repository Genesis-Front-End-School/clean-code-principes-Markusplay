import React from 'react';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import BlockIcon from '@mui/icons-material/Block';
import { Button } from '@mui/material';

import styles from './ListLessons.module.scss';

export interface ListLessonsProps {
  title: string;
  previewImageLink: string;
  setCurrentLesson: React.Dispatch<React.SetStateAction<number>>;
  disabled: boolean;
  order: number;
  duration: number;
}

const ListLessons: React.FC<ListLessonsProps> = ({
  duration,
  setCurrentLesson,
  title = 'video',
  disabled,
  previewImageLink,
  order,
}) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;

  return (
    <div className={styles.list}>
      {disabled ? (
        <>
          <Button
            className={styles.button}
            disabled={disabled}
            endIcon={
              <BlockIcon
                style={{ width: '24px', height: '24px', marginBottom: '10px' }}
              />
            }
            onClick={() => {
              setCurrentLesson(order - 1);
              window.scrollTo(0, 0);
            }}
          >
            <p className={styles.title}>{title}</p>
          </Button>
        </>
      ) : (
        <div className={styles.item}>
          <video
            className={styles.video}
            style={{ width: '100%', height: 'fit-content' }}
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
            style={{
              fontWeight: 'bold',
              borderRadius: '5px',
              marginTop: '15px',
              width: '100%',
              height: 'fit-content',
            }}
            disabled={disabled}
            endIcon={
              <ArrowCircleUpOutlinedIcon
                style={{ width: '24px', height: '24px' }}
              />
            }
            onClick={() => {
              setCurrentLesson(order - 1);
              window.scrollTo(0, 0);
            }}
          >
            <p className={styles.title}>{title}</p>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ListLessons;
