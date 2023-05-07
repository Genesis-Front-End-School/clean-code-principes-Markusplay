import { Dispatch, FC, SetStateAction } from 'react';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

import DisabledButton from './components/DisabledButton/DisabledButton';
import EnabledButton from './components/EnabledButton/EnabledButton';

import styles from './ListLessons.module.scss';

export interface ListButtonProps {
  title: string;
  handleClick: () => void;
}

interface ListLessonsProps {
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
  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;

  const handleClick = () => {
    setCurrentLesson(order - 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.list}>
      {disabled && <DisabledButton title={title} handleClick={handleClick} />}
      <div className={styles.item}>
        <video
          className={styles.video}
          poster={previewImageLink ? previewImageLink : './not-found.png'}
        />
        <div className={styles.time}>
          <AccessTimeFilledIcon />
          {minutes}m {seconds}s
        </div>
        <EnabledButton title={title} handleClick={handleClick} />
      </div>
    </div>
  );
};

export default ListLessons;
