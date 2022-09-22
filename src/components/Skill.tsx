import React, { MouseEvent } from "react";

interface SkillProps {
  name: string;
  upvote: number;
  onUpvote: (e: MouseEvent) => void;
}

const Skill: React.FC<SkillProps> = ({ name, upvote, onUpvote }) => {
  return (
    <li onClick={onUpvote}>
      {name} <span>{upvote}</span>
    </li>
  );
};

export default Skill;
