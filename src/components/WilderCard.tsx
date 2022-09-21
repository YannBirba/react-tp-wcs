import React, { MouseEvent } from "react";
// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
// @ts-ignore
import blank_profile from "../assets/blank_profile.png";
import Skill from "./Skill";
// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
// @ts-ignore
import styles from "./WilderCard.module.css";
import { Upvote } from "../types/Upvote";

interface WilderCardProps {
  name: string;
  city?: string;
  onDelete: (e: MouseEvent) => void;
  onSelect: (e: MouseEvent) => void;
  onUpvote: (e: MouseEvent, id: number) => void;
  isSelected: boolean;
  upvotes: Upvote[] | undefined;
}

const WilderCard: React.FC<WilderCardProps> = ({
  name,
  city,
  onDelete,
  onUpvote,
  onSelect,
  isSelected,
  upvotes = [],
}) => {
  return (
    <article
      onClick={onSelect}
      className={styles.Card}
      aria-selected={isSelected}
    >
      <img src={blank_profile} alt={`${name} profile`} />
      <h3>{name}</h3>
      {city !== undefined ? <p>{city}</p> : null}
      <h4>Wild Skills</h4>
      <ul className={styles.Skills}>
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
      <button onClick={onDelete}>Supprimer</button>
    </article>
  );
};

export default WilderCard;
