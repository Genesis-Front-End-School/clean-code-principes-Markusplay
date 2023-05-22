import { FC, useMemo } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import { Lessons } from '../../../../redux/lessons/type';
import { VideoPlayerKeys } from '../../../../utils/constants/constants';
import { getDate } from '../../../../utils/getDate';

import styles from './CourseInfo.module.scss';

interface ICourseInfo {
  lessons: Lessons | null;
}

const CourseInfo: FC<ICourseInfo> = ({ lessons }) => {
  const date = useMemo(() => {
    return getDate(lessons);
  }, [lessons]);

  return (
    <div className={styles.courseInfo}>
      <div>
        <h4>*To speed up the video, press {VideoPlayerKeys.SPEED_UP}</h4>
        <h4>*To slow down the video, press {VideoPlayerKeys.SLOW_DOWN}</h4>
      </div>
      <div>
        <h4 className={styles.date}>
          <CalendarTodayIcon />
          Launch date:{date}
        </h4>
      </div>
    </div>
  );
};
export default CourseInfo;
