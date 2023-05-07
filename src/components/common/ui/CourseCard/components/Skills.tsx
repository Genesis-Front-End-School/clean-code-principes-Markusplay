import { FC } from 'react';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import styles from './Skills.module.scss';

interface SkillsProps {
  skills: string[];
}

const Skills: FC<SkillsProps> = ({ skills }) => {
  return (
    <>
      <p>
        <AutoFixHighIcon
          data-testid="autoFixHighIcon"
          className={styles.autoFixHighIcon}
        />
        Skills
      </p>
      <div className={styles.skillsList}>
        {skills?.map(skill => (
          <i data-testid="skill" className={styles.skill} key={skill}>
            {skill}
          </i>
        ))}
      </div>
    </>
  );
};

export default Skills;
