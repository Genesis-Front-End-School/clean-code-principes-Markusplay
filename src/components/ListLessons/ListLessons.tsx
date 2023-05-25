import { Dispatch, FC, SetStateAction } from 'react';
import { Button } from '@markusplay/markus-ui-lib';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

import { useTime } from '../../hooks/useTime';

import styles from './ListLessons.module.scss';

interface IListLessonsProps {
  title: string;
  previewImageLink: string;
  setCurrentLesson: Dispatch<SetStateAction<number>>;
  disabled: boolean;
  order: number;
  duration: number;
}

const ListLessons: FC<IListLessonsProps> = ({
  title,
  previewImageLink,
  duration,
  order,
  setCurrentLesson,
  disabled = false,
}) => {
  const [minutes, seconds] = useTime(duration);

  const poster =
    `${previewImageLink}/lesson-${order}.webp` || './not-found.png';
  const handleClick = () => {
    setCurrentLesson(order - 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.list}>
      <div className="item">
        <video className={styles.video} poster={poster} />
        <h6 className={styles.time}>
          <AccessTimeFilledIcon />
          {minutes}m {seconds}s
        </h6>
        <Button
          text={title}
          className="button"
          handleClick={handleClick}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default ListLessons;
