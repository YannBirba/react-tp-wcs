import React, { MouseEvent } from "react";
// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
// @ts-ignore
import styles from "./Skill.module.css";

interface SkillProps {
  name: string;
  upvote: number;
  onUpvote: (e: MouseEvent) => void;
}

const Skill: React.FC<SkillProps> = ({ name, upvote, onUpvote }) => {
  return (
    <li onClick={onUpvote} className={styles.Skill}>
      {name} <span className={styles.Votes}>{upvote}</span>
    </li>
  );
};

export default Skill;
