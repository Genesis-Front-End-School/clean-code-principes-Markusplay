import { FC, useMemo, useRef } from 'react';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Button, Rating } from '@mui/material';
import Hls from 'hls.js';

import { useTime } from '../../../../hooks/useTime';
import { Course } from '../../../../redux/type';

import Skills from './components/Skills';
import Tags from './components/Tags';

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

  useMemo(() => {
    if (video && videoPreviewLink) {
      const hls = new Hls();
      hls.loadSource(videoPreviewLink);
      hls.attachMedia(video);
    }
  }, [video, videoPreviewLink]);

  const handleMouseEnter = () => {
    if (video) {
      video.play();
    }
  };

  const handleMouseLeave = () => {
    if (video) {
      video.pause();
    }
  };

  return (
    <div className="courseCard">
      <img
        src={`${previewImageLink}/cover.webp`}
        className={styles.courseImg}
        alt="Preview image"
        width="400"
        height="180"
      />
      <video
        role="video"
        loop
        className={styles.courseVideo}
        ref={videoRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        poster={poster}
        muted
      />
      <div className={styles.courseInfo}>
        <h4 className="course-card-title">{title}</h4>
        <Tags tags={tags} />
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
        <Button
          href={`/preview-courses/${id}`}
          className="button"
          variant="contained"
          color="error"
          endIcon={<ArrowCircleRightIcon />}
        >
          Explore
        </Button>
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
