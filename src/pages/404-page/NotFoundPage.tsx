import { Button } from '@mui/material';

import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => (
  <div className={styles.pageContent}>
    <h3 className={styles.notFoundText}>
      Упс! 404 помилка. Сторінку не знайдено.
    </h3>
    <div className={styles.button}>
      <Button
        className={styles.button}
        href="/"
        size="large"
        variant="contained"
      >
        Повернутися на головну
      </Button>
    </div>
  </div>
);

export default NotFoundPage;
