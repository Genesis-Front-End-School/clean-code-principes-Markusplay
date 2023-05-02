import React, { FC, useRef, useState } from 'react';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Button, Rating } from '@mui/material';
import Hls from 'hls.js';
import Link from 'next/link';

import { Course } from '@/redux/type';

import styles from './CourseCard.module.scss';

interface CourseCardProps {
  courseData: Course;
}

const CourseCard: FC<CourseCardProps> = ({ courseData }) => {
  const {
    id,
    title,
    tags,
    description,
    duration,
    lessonsCount,
    previewImageLink,
    rating,
    meta: {
      skills,
      courseVideoPreview: {
        link: videoPreviewLink,
        previewImageLink: videoPreviewImageLink,
      },
    },
  } = courseData;

  const [isVideoLinkBroken, setIsVideoLinkBroken] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = videoRef.current;
  const minutes: number = Math.floor(duration / 60);
  const seconds: number = duration - minutes * 60;

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
      <div className={styles.skills}>
        {skills && (
          <>
            <p>
              <AutoFixHighIcon className={styles.autoFixHighIcon} />
              Skills
            </p>
            <div className={styles.skillsList}>
              {skills?.map(skill => (
                <i className={styles.skill} key={skill}>
                  {skill}
                </i>
              ))}
            </div>
          </>
        )}
      </div>
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
        <div className={styles.rating}>
          <Rating
            name="read-only"
            size="large"
            value={rating}
            precision={0.5}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
