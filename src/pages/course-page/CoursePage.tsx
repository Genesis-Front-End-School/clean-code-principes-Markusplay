import { useEffect, useMemo, useRef, useState } from 'react';
import { CalendarToday } from '@mui/icons-material';
import Hls from 'hls.js';
import { useRouter } from 'next/router';

import ListLessons from '../../components/common/ui/ListLessons';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelect';
import { fetchLessons } from '../../redux/lessons/asyncActions';
import { selectDetails } from '../../redux/lessons/selectors';
import { Lesson } from '../../redux/lessons/type';
import { changePlaybackRate } from '../../utils/changePlaybackRate';
import { VideoPlayerKeys } from '../../utils/constants/constants';
import { sortLessons } from '../../utils/sortLessons';

import styles from './CoursePage.module.scss';

const CoursePage = () => {
  const router = useRouter();
  const [currentLesson, setCurrentLesson] = useState(0);
  const courseId: string = router.query.courseId as string;
  const lessons = useAppSelector(selectDetails);
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = videoRef.current;
  const dispatch = useAppDispatch();

  const sortedLessons = useMemo((): Lesson[] => {
    return sortLessons(lessons?.lessons);
  }, [lessons?.lessons]);

  const poster = sortedLessons?.[currentLesson]?.previewImageLink
    ? `${sortedLessons?.[currentLesson]?.previewImageLink}/lesson-${sortedLessons?.[currentLesson]?.order}.webp`
    : './not-found.png';

  if (video && sortedLessons?.[currentLesson]?.previewImageLink) {
    const hls = new Hls();

    if (!sortedLessons?.[currentLesson].link) {
      router.push('/404');
    }
    hls.loadSource(sortedLessons?.[currentLesson].link || '');
    hls.attachMedia(video);
  }

  useEffect(() => {
    dispatch(
      fetchLessons({
        id: courseId,
      }),
    );
  }, [courseId, dispatch]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (
        video &&
        video.playbackRate > VideoPlayerKeys.MIN_SPEED &&
        video.playbackRate < VideoPlayerKeys.MAX_SPEED
      ) {
        changePlaybackRate(event, video);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [video]);

  return (
    <div className={styles.page}>
      <p className={styles.title}>{lessons?.title}</p>
      <div className={styles.videoList}>
        <div className={styles.video}>
          <h3 className={styles.subTitle}>
            Lesson: {sortedLessons?.[currentLesson]?.title}
          </h3>
          <video
            className={styles.myVideo}
            controls
            poster={poster}
            ref={videoRef}
          />
          <div className={styles.courseInfo}>
            <div>
              <h6>*To speed up the video, press {VideoPlayerKeys.SPEED_UP}</h6>
              <h6>
                *To slow down the video, press {VideoPlayerKeys.SLOW_DOWN}
              </h6>
            </div>
            <div>
              <h6 className={styles.date}>
                <CalendarToday />
                Launch date:
                {lessons?.launchDate
                  ? new Date(lessons?.launchDate).toLocaleDateString('en-GB')
                  : 'No date available'}
              </h6>
            </div>
          </div>
        </div>
        <div className={styles.lessons}>
          <h4 className={styles.content}>Lessons:</h4>
          {sortedLessons?.map(lesson => (
            <ListLessons
              duration={lesson.duration}
              setCurrentLesson={setCurrentLesson}
              order={lesson.order}
              key={lesson.id}
              title={lesson.title}
              disabled={lesson.status !== 'unlocked'}
              previewImageLink={`${lesson.previewImageLink}/lesson-${lesson.order}.webp`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
