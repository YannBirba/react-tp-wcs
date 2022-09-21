import React, { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { Skill } from "../types/Skill";

interface ManageSkillsFormProps {
  skills: Skill[];
  onDelete: (e: MouseEvent, id: number) => void;
  onUpdate: (e: ChangeEvent, id: number) => void;
  onAdd: (e: FormEvent) => void;
}

export const ManageSkillsForm: React.FC<ManageSkillsFormProps> = ({
  skills,
  onDelete,
  onUpdate,
  onAdd,
}) => {
  const [skillsState, setSkillsState] = useState<Skill[]>(skills);
  return (
    <>
      <h2>Gestion des skills</h2>
      {skillsState.map((skill: Skill) => (
        <div key={`manage-skill-${skill.id !== undefined ? skill.id : 0}`}>
          <input
            type="text"
            value={skill.name}
            name={`manage-skill-${skill.id !== undefined ? skill.id : 0}`}
            onChange={(e) => {
              skill.id !== undefined && onUpdate(e, skill.id);
              setSkillsState(
                skillsState.map((skillState) => {
                  if (skillState.id === skill.id) {
                    return { ...skillState, name: e.target.value };
                  }
                  return skillState;
                })
              );
            }}
          />
          <button
            onClick={(e) => skill.id !== undefined && onDelete(e, skill.id)}
          >
            X
          </button>
        </div>
      ))}
      <form onSubmit={onAdd}>
        <input type="text" name="name" />
        <button type="submit">Ajouter</button>
      </form>
    </>
  );
};
