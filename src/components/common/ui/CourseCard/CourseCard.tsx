import { FC, useRef, useState } from 'react';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Button, Rating } from '@mui/material';
import Hls from 'hls.js';
import Link from 'next/link';

import { useTime } from '../../../../hooks/useTime';
import { Course } from '../../../../redux/type';

import Skills from './components/Skills';

import styles from './CourseCard.module.scss';

interface ICourseCardProps {
  courseData: Course;
}

const CourseCard: FC<ICourseCardProps> = ({ courseData }) => {
  const {
    id,
    title,
    tags,
    description,
    duration,
    lessonsCount,
    previewImageLink,
    rating,
    meta: { skills },
  } = courseData;

  const [isVideoLinkBroken, setIsVideoLinkBroken] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [minutes, seconds] = useTime(duration);
  const video = videoRef.current;

  const videoPreviewLink = courseData.meta?.courseVideoPreview?.link;
  const videoPreviewImageLink =
    courseData.meta?.courseVideoPreview?.previewImageLink;
  const poster =
    videoPreviewLink || videoPreviewImageLink
      ? `${videoPreviewImageLink}/cover.webp`
      : './not-found.png';

  const handleMouseEnter = () => {
    if (video && videoPreviewImageLink) {
      const hls = new Hls();

      hls.on(Hls.Events.ERROR, function () {
        setIsVideoLinkBroken(true);
      });
      hls.loadSource(videoPreviewLink);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    }
  };

  const handleMouseLeave = () => {
    if (video) {
      video.pause();
    }
  };

  return (
    <div className={styles.courseCard}>
      <img
        src={`${previewImageLink}/cover.webp`}
        className={styles.courseImg}
      />
      <video
        role="video"
        loop
        className={styles.courseVideo}
        ref={videoRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        poster={!isVideoLinkBroken ? poster : './not-found.png'}
        muted
      />
      <div className={styles.courseInfo}>
        <p className={styles.title}>{title}</p>
        <div className={styles.tags}>
          {tags.map(tag => (
            <b className={styles.tag} key={tag}>
              {tag}
            </b>
          ))}
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.lessonsTime}>
          <div className={styles.assignmentIcon}>
            {<AssignmentIcon />}
            <strong>{lessonsCount} lessons</strong>
          </div>
          <div className={styles.time}>
            <AccessTimeFilledIcon />
            {minutes}m {seconds}s
          </div>
        </div>
      </div>
      {skills && <Skills skills={skills} />}
      <div className={styles.tagRating}>
        <Link className={styles.button} href={`/preview-courses/${id}`}>
          <Button
            className={styles.button}
            variant="contained"
            color="error"
            endIcon={<ArrowCircleRightIcon />}
          >
            Explore
          </Button>
        </Link>
        <Rating
          className={styles.rating}
          name="read-only"
          size="large"
          value={rating}
          precision={0.5}
          readOnly
        />
      </div>
    </div>
  );
};

export default CourseCard;
