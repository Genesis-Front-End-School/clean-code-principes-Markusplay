import React from 'react';
import { useRef, useState } from 'react';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Button, Rating } from '@mui/material';
import Hls from 'hls.js';
import Link from 'next/link';

import styles from './CourseCard.module.scss';
interface CourseCardProps {
  id: string;
  tags: string[];
  title: string;
  description: string;
  duration: number;
  image: string;
  launchDate?: string;
  lessonsCount: number;
  containsLockedLessons: boolean;
  skills?: string[];
  rating: number;
  slug: string;
  videoPreviewLink: string;
  videoPreviewDuration: number;
  videoPreviewImageLink: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  tags,
  title,
  description,
  skills,
  image,
  duration,
  lessonsCount,
  rating,
  videoPreviewLink,
  videoPreviewImageLink,
}) => {
  const [isBroken, setIsBroken] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;

  const poster =
    videoPreviewLink || videoPreviewImageLink
      ? `${videoPreviewImageLink}/cover.webp`
      : './not-found.png';

  const handleMouseEnter = () => {
    const video = videoRef.current;

    if (video && videoPreviewImageLink) {
      const hls = new Hls();

      hls.on(Hls.Events.ERROR, function () {
        setIsBroken(true);
      });
      hls.loadSource(videoPreviewLink);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    }
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
  };

  return (
    <div className={styles.courseCard}>
      <img src={`${image}/cover.webp`} className={styles.courseImg}></img>

      <video
        loop={true}
        className={styles.courseVideo}
        ref={videoRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        poster={!isBroken ? poster : './not-found.png'}
        muted
      />

      <div className={styles.courseInfo}>
        <p className={styles.title}>{title}</p>

        <div className={styles.tags}>
          {tags.map((tag, index) => (
            <b className={styles.tag} key={index}>
              {tag}
            </b>
          ))}
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.lessonsTime}>
          <div style={{ display: 'flex', gap: '10px' }}>
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
            <p style={{ marginTop: '20px' }}>
              <AutoFixHighIcon
                style={{ marginRight: '10px', color: 'brown' }}
              />
              Skills
            </p>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {skills?.map((skill, index) => (
                <i className={styles.skill} key={index}>
                  {skill}
                </i>
              ))}
            </div>
          </>
        )}
      </div>
      <div className={styles.tagRating}>
        <Link href={`/preview-courses/${id}`} className={styles.button}>
          <Button
            variant="contained"
            color="error"
            style={{
              width: 'calc(100% - 80px)',
              marginTop: '20px',
            }}
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
