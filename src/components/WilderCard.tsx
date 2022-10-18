import React, { MouseEvent } from "react";
// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
// @ts-ignore
import blank_profile from "../assets/blank_profile.png";
import Skill from "./Skill";
import { Upvote } from "../types/Upvote";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import CheckBadgeIcon from "@heroicons/react/24/solid/CheckBadgeIcon";

interface WilderCardProps {
  name: string;
  city?: string;
  onDelete: (e: MouseEvent) => void;
  onUpvote: (e: MouseEvent, id: number) => void;
  onEdit: (e: MouseEvent) => void;
  upvotes: Upvote[] | undefined;
}

const WilderCard: React.FC<WilderCardProps> = ({
  name,
  city,
  onDelete,
  onUpvote,
  onEdit,
  upvotes = [],
}) => {
  const isComplete = (): boolean => {
    if (city !== undefined && upvotes.length > 2) {
      return true;
    }
    return false;
  };
  return (
    <article className="wild-card bg-white shadow-md drop-shadow-lg rounded-lg p-4 flex-basis-0 flex-grow-0 flex-shrink-0 transition-all duration-500 ease-in-out transform hover:scale-105 select-none flex flex-col gap-2 max-w-[224px] group hover:shadow-xl hover:drop-shadow-xl">
      <img
        className="max-w-full w-48 rounded-full object-cover aspect-square"
        src={blank_profile}
        alt={`${name} profile`}
      />
      <div className="flex items-center gap-3 my-2">
        <h3 className="font-semibold text-lg">{name}</h3>
        {isComplete() && <CheckBadgeIcon className="fill-wcs-pink" aria-label="profile complété" width={24} />}
      </div>
      {city !== undefined ? (
        <p className="text-slate-600 italic mb-2">{city}</p>
      ) : null}
      <ul className="flex flex-wrap gap-3 max-w-[250px]">
        {upvotes.length > 0 ? (
          upvotes.map((upvote) => (
            <Skill
              key={upvote.id}
              name={upvote.skill.name}
              upvote={upvote.upvote}
              onUpvote={(e: MouseEvent) =>
                upvote.id !== undefined && onUpvote(e, upvote.id)
              }
            />
          ))
        ) : (
          <p>Pas de skill pour le moment</p>
        )}
      </ul>
      <button
        title={`Supprimer ${name}`}
        aria-label={`Supprimer ${name}`}
        className="absolute opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out hover:bg-wcs-pink p-1 rounded-full hover:text-slate-50 left-3"
        onClick={onDelete}
      >
        <TrashIcon width={24} />
      </button>
      <button
        title={`Modifier ${name}`}
        aria-label={`Modifier ${name}`}
        className="absolute opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out hover:bg-wcs-pink p-1 rounded-full hover:text-slate-50 right-3"
        onClick={onEdit}
      >
        <PencilIcon width={24} />
      </button>
    </article>
  );
};

export default WilderCard;
