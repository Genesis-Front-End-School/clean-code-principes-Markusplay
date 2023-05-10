import { FC } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import { Lessons } from '../../../../redux/lessons/type';
import { VideoPlayerKeys } from '../../../../utils/constants/constants';

import styles from './CourseInfo.module.scss';

interface ICourseInfo {
  lessons: Lessons | null;
}

const CourseInfo: FC<ICourseInfo> = ({ lessons }) => {
  return (
    <div className={styles.courseInfo}>
      <div>
        <h3>*To speed up the video, press {VideoPlayerKeys.SPEED_UP}</h3>
        <h3>*To slow down the video, press {VideoPlayerKeys.SLOW_DOWN}</h3>
      </div>
      <div>
        <h2 className={styles.date}>
          <CalendarTodayIcon />
          Launch date:
          {lessons?.launchDate
            ? new Date(lessons?.launchDate).toLocaleDateString('en-GB')
            : 'No date available'}
        </h2>
      </div>
    </div>
  );
};
export default CourseInfo;
