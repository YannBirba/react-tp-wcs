import React, { MouseEvent, useState } from "react";
import classNames from "classnames";
import HandThumbUpIcon from "@heroicons/react/24/solid/HandThumbUpIcon";

interface SkillProps {
  name: string;
  upvote: number;
  onUpvote: (e: MouseEvent) => void;
}

const Skill: React.FC<SkillProps> = ({ name, upvote, onUpvote }) => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <li
      className="bg-wcs-pink rounded-full p-1 px-3 text-slate-50 font-semibold text-xs drop-shadow-lg shadow-sm flex gap-2 items-center"
      onClick={onUpvote}
    >
      {name}
      <span
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        title={`Cliquer pour upvoter à ${upvote + 1}`}
        aria-label={`Cliquer pour upvoter à ${upvote + 1}`}
        className={classNames(
          "bg-white rounded-full w-6 h-6 text-slate-700 flex items-center justify-center font-bold hover:cursor-pointer",
          upvote <= 10 && "bg-red-100 border-2 border-red-500",
          upvote >= 10 &&
            upvote < 25 &&
            "bg-orange-100 border-2 border-orange-500",
          upvote >= 25 &&
            upvote < 50 &&
            "bg-yellow-100 border-2 border-yellow-500",
          upvote >= 50 &&
            upvote < 100 &&
            "bg-green-100 border-2 border-green-500",
          upvote >= 100 && "bg-blue-100 border-2 border-blue-500"
        )}
      >
        {hover ? <HandThumbUpIcon width={15} /> : upvote}
      </span>
    </li>
  );
};

export default Skill;
