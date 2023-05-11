import { FC } from 'react';

import styles from './Tags.module.scss';

interface ITagsProps {
  tags: string[];
}

const Tags: FC<ITagsProps> = ({ tags }) => {
  return (
    <div className={styles.tags}>
      {tags.map(tag => (
        <b className={styles.tag} key={tag}>
          {tag}
        </b>
      ))}
    </div>
  );
};

export default Tags;
