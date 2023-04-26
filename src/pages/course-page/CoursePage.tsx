import { useEffect, useRef, useState } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Hls from 'hls.js';
import { useRouter } from 'next/router';

import ListLessons from '@/components/common/ui/ListLessons';
import { useAppDispatch, useAppSelector } from '@/hooks/useSelect';
import { fetchLessons } from '@/redux/lessons/asyncActions';
import { selectDetails } from '@/redux/lessons/selectors';
import { Lesson } from '@/redux/lessons/type';

import styles from './CoursePage.module.scss';
const enum VideoPlayerKeys {
  SPEED_UP = '1',
  SLOW_DOWN = '0',
  SPEED_UP_STEP = 0.1,
  SLOW_DOWN_STEP = 0.1,
  MAX_SPEED = 2,
  MIN_SPEED = 0.5,
}

const CoursePage = () => {
  const router = useRouter();
  const [currentLesson, setCurrentLesson] = useState(0);
  const courseId = router.query.courseId as string;
  const lessons = useAppSelector(selectDetails);
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = videoRef.current;
  const dispatch = useAppDispatch();

  const sortLessons = (lessons: Lesson[] | undefined) => {
    if (lessons) {
      return lessons.slice().sort((a, b) => a.order - b.order);
    }
    return [];
  };

  const sortedLessons = sortLessons(lessons?.lessons);

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
        event.key === VideoPlayerKeys.SPEED_UP &&
        video &&
        video.playbackRate < VideoPlayerKeys.MAX_SPEED
      ) {
        video.playbackRate += VideoPlayerKeys.SPEED_UP_STEP;
      }

      if (
        event.key === VideoPlayerKeys.SLOW_DOWN &&
        video &&
        video.playbackRate > VideoPlayerKeys.MIN_SPEED
      ) {
        video.playbackRate -= VideoPlayerKeys.SLOW_DOWN_STEP;
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
                <CalendarTodayIcon />
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
