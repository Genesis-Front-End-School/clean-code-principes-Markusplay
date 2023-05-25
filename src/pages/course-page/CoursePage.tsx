import { useEffect, useMemo, useRef, useState } from 'react';
import React from 'react';
import Hls from 'hls.js';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '../../hooks/useSelect';
import { fetchLessons } from '../../redux/lessons/asyncActions';
import { selectDetails } from '../../redux/lessons/selectors';
import { Lesson } from '../../redux/lessons/type';
import { changePlaybackRate } from '../../utils/changePlaybackRate';
import { VideoPlayerKeys } from '../../utils/constants/constants';
import { sortLessons } from '../../utils/sortLessons';

import CourseInfo from './components/CourseInfo/CourseInfo';

import styles from './CoursePage.module.scss';

const ListLessons = dynamic(() => import('../../components/ListLessons'));

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

  const title = sortedLessons?.[currentLesson]?.title;

  const poster = sortedLessons?.[currentLesson]?.previewImageLink
    ? `${sortedLessons?.[currentLesson]?.previewImageLink}/lesson-${sortedLessons?.[currentLesson]?.order}.webp`
    : './not-found.png';

  useEffect(() => {
    if (video && sortedLessons?.[currentLesson]?.previewImageLink) {
      const hls = new Hls();

      if (!sortedLessons?.[currentLesson].link) {
        router.push('/404');
      }
      hls.loadSource(sortedLessons?.[currentLesson].link || '');
      hls.attachMedia(video);
    }
  }, [currentLesson, router, sortedLessons, video]);

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
          <h4 className={styles.subTitle}>Lesson: {title}</h4>
          <video
            className={styles.myVideo}
            controls
            poster={poster}
            ref={videoRef}
          />
          <CourseInfo lessons={lessons} />
        </div>
        <div className={styles.lessons}>
          <h2 className={styles.content}>Lessons:</h2>
          {sortedLessons?.map(lesson => (
            <ListLessons
              key={lesson.id}
              setCurrentLesson={setCurrentLesson}
              disabled={lesson.status !== 'unlocked'}
              title={lesson.title}
              previewImageLink={lesson.previewImageLink}
              order={lesson.order}
              duration={lesson.duration}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
