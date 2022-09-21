import React, { FormEvent } from "react";
import { Skill } from "../types/Skill";
import { Wilder } from "../types/Wilder";

interface UpdateWilderFormProps {
  wilder: Wilder;
  updateWilder: (e: FormEvent) => void;
  skills: Skill[];
}

const UpdateWilderForm: React.FC<UpdateWilderFormProps> = ({
  wilder,
  updateWilder,
  skills,
}) => {
  const isSkillChecked = (id: number | undefined): boolean => {
    if (
      wilder.upvotes !== undefined &&
      id !== undefined &&
      wilder.upvotes.find((upvote) => upvote.skill.id === id) !== undefined
    ) {
      return true;
    }
    return false;
  };

  return (
    <>
      <h1>Modifier le wilder : {wilder.name}</h1>
      <form onSubmit={updateWilder}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" defaultValue={wilder.name} />
        <label htmlFor="city">City</label>
        <input type="text" name="city" id="city" defaultValue={wilder.city} />
        <h2>Gestion des skills du wilder</h2>
        <fieldset>
          {skills.map((skill) => (
            <label
              key={
                skill.id !== undefined && wilder.id !== undefined
                  ? `${skill.id}-${wilder.id}`
                  : ""
              }
              htmlFor={`skill-${skill.id !== undefined ? skill.id : 0}`}
              title={`skill-${skill.id !== undefined ? skill.id : 0}`}
            >
              <input
                type="checkbox"
                name={`skill-${skill.id !== undefined ? skill.id : 0}`}
                defaultChecked={isSkillChecked(skill.id)}
              />
              {skill.name}
            </label>
          ))}
        </fieldset>
        {wilder.upvotes !== undefined && wilder.upvotes.length > 0 && (
          <h2>Gestion des upvotes du wilder</h2>
        )}
        {wilder.upvotes !== undefined && wilder.upvotes.length > 0 && (
          <fieldset>
            {wilder.upvotes.map((upvote) => (
              <label
                key={upvote.id}
                htmlFor={`upvote-${upvote.id !== undefined ? upvote.id : 0}`}
                title={`upvote-${upvote.id !== undefined ? upvote.id : 0}`}
              >
                {upvote.skill.name}
                <input
                  style={{ width: "50px" }}
                  type="number"
                  name={`upvote-${upvote.id !== undefined ? upvote.id : 0}`}
                  defaultValue={upvote.upvote}
                />
              </label>
            ))}
          </fieldset>
        )}
        <button
          type="submit"
          title="Mettre à jour le wilder"
          aria-label="Mettre à jour le wilder"
        >
          Mettre à jour
        </button>
      </form>
    </>
  );
};

export default UpdateWilderForm;
