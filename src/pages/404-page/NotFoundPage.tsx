import { Button } from '@mui/material';
import Link from 'next/link';

import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => (
  <div className={styles.pageContent}>
    <h3 className={styles.notFoundText}>
      Упс! 404 помилка. Сторінку не знайдено.
    </h3>
    <div className={styles.button}>
      <Link href="/">
        <Button className={styles.button} size="large" variant="contained">
          Повернутися на головну
        </Button>
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
