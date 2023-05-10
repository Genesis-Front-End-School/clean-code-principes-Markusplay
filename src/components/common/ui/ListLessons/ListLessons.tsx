import { Dispatch, FC, SetStateAction } from 'react';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

import { useTime } from '../../../../hooks/useTime';

import LessonButton from './components/Button';

import styles from './ListLessons.module.scss';

interface ListLessonsProps {
  title: string;
  previewImageLink: string;
  setCurrentLesson: Dispatch<SetStateAction<number>>;
  disabled: boolean;
}

const ListLessons: FC<IListLessonsProps> = ({
  lesson,
  setCurrentLesson,
  disabled = false,
}) => {
  const [minutes, seconds] = useTime(duration);

  const poster = previewImageLink || './not-found.png';

  const preview = `${previewImageLink}/lesson-${order}.webp`;
  const poster = preview ? preview : './not-found.png';

  const handleClick = () => {
    setCurrentLesson(order - 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.list}>
      <div className={styles.item}>
        <video className={styles.video} poster={poster} />
        <div className={styles.time}>
          <AccessTimeFilledIcon />
          {minutes}m {seconds}s
        </div>
        <LessonButton
          title={title}
          handleClick={handleClick}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default ListLessons;
