import { FC, useMemo, useRef } from 'react';
import { Button, Skills, Tags } from '@markusplay/markus-ui-lib';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import { Rating } from '@mui/material';
import Hls from 'hls.js';

import { useTime } from '../../hooks/useTime';
import { Course } from '../../redux/type';

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
        <div className={styles.tags}>
          <Tags tags={tags} className={styles.tag} tagClassName={''} />
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

      <div className={styles.skillTitle}>
        <LabelImportantIcon />
        <p>Skills</p>
      </div>

      {skills && (
        <Skills
          skills={skills}
          className={styles.skills}
          skillClassName={styles.skillClassName}
        />
      )}

      <div className={styles.tagRating}>
        <Button
          text="Explore"
          href={`/preview-courses/${id}`}
          className="button"
          endIcon={<ArrowCircleRightIcon />}
        />

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
