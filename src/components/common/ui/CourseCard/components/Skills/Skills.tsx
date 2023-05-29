import { FC } from 'react';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import styles from './Skills.module.scss';

interface ISkillsProps {
  skills: string[];
}

const Skills: FC<ISkillsProps> = ({ skills }) => {
  return (
    <div className={styles.skills}>
      <p>
        <AutoFixHighIcon
          data-testid="autoFixHighIcon"
          className={styles.autoFixHighIcon}
        />
        Skills
      </p>
      <div className={styles.skillsList}>
        {skills?.map(skill => (
          <div data-testid="skill" className={styles.skill} key={skill}>
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
