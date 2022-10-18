import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import React, { FormEvent, MouseEvent } from "react";
import { Skill } from "../types/Skill";
import { Wilder } from "../types/Wilder";

interface UpdateWilderFormProps {
  wilder: Wilder;
  updateWilder: (e: FormEvent) => void;
  skills: Skill[];
  isOpen: boolean;
  setIsOpen: () => void;
}

const UpdateWilderForm: React.FC<UpdateWilderFormProps> = ({
  wilder,
  updateWilder,
  skills,
  isOpen,
  setIsOpen,
}) => {
  const [isEditingSkills, setIsEditingSkills] = React.useState<boolean>(false);
  const [isEditingUpvotes, setIsEditingUpvotes] =
    React.useState<boolean>(false);
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

  const handleEditSkills = (e: MouseEvent): void => {
    setIsEditingSkills(!isEditingSkills);
    setIsEditingUpvotes(false);
  };

  const handleEditUpvotes = (e: MouseEvent): void => {
    setIsEditingUpvotes(!isEditingUpvotes);
    setIsEditingSkills(false);
  };

  return (
    <div className="fixed flex items-center justify-center bg-black/75 min-h-screen min-w-full inset-0 z-50">
      <dialog
        open={isOpen}
        className="bg-slate-50 rounded-xl p-10 flex flex-col gap-3 drop-shadow max-w-full min-w-[350px]"
      >
        <button
          className="absolute right-4 top-4 rounded-full p-1 hover:bg-wcs-pink hover:text-white transition-all duration-500 ease-in-out"
          onClick={setIsOpen}
        >
          <XMarkIcon width={20} />
        </button>
        <h1 className="text-xl font-semibold text-slate-700">
          Modifier le wilder
        </h1>
        <form onSubmit={updateWilder} className="flex flex-col gap-2 my-3">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" defaultValue={wilder.name} />
          <label htmlFor="city">City</label>
          <input type="text" name="city" id="city" defaultValue={wilder.city} />
          <div className="relative">
            <button
              className="bg-wcs-pink text-white rounded-lg p-2 hover:bg-wcs-pink-dark transition-all duration-500 ease-in-out hover:scale-95 active:scale-90 drop-shadow-md shadow-xl flex gap-2 relative w-full justify-center"
              onClick={handleEditSkills}
            >
              Gestion des skills du wilder
            </button>
            {isEditingSkills && !isEditingUpvotes && (
              <fieldset className="bg-white border rounded-lg p-3 drop-shadow max-w-fit flex gap-3 absolute flex-wrap z-10 shadow-lg cursor-pointer">
                {skills.map((skill) => (
                  <label
                    className="flex gap-2 items-center "
                    key={
                      skill.id !== undefined && wilder.id !== undefined
                        ? `${skill.id}-${wilder.id}`
                        : ""
                    }
                    htmlFor={`skill-${skill.id !== undefined ? skill.id : 0}`}
                    title={`skill-${skill.id !== undefined ? skill.id : 0}`}
                  >
                    <input
                      id={`skill-${skill.id !== undefined ? skill.id : 0}`}
                      className="peer hidden"
                      type="checkbox"
                      name={`skill-${skill.id !== undefined ? skill.id : 0}`}
                      defaultChecked={isSkillChecked(skill.id)}
                    />
                    <span className="peer-checked:border-wcs-pink border-2 cursor-pointer p-1 rounded-xl">
                      {skill.name}
                    </span>
                  </label>
                ))}
              </fieldset>
            )}
          </div>
          {wilder.upvotes !== undefined && wilder.upvotes.length > 0 && (
            <div className="relative">
              <button
                className="bg-wcs-pink text-white rounded-lg p-2 hover:bg-wcs-pink-dark transition-all duration-500 ease-in-out hover:scale-95 active:scale-90 drop-shadow-md shadow-xl flex gap-2 relative w-full justify-center"
                onClick={handleEditUpvotes}
              >
                Gestion des upvotes du wilder
              </button>
              {isEditingUpvotes && !isEditingSkills && (
                <fieldset className="bg-white border rounded-lg p-3 drop-shadow max-w-fit flex gap-3 absolute flex-wrap z-10 shadow-lg cursor-pointer">
                  {wilder.upvotes.map((upvote) => (
                    <label
                      className="flex gap-2 items-center"
                      key={upvote.id}
                      htmlFor={`upvote-${
                        upvote.id !== undefined ? upvote.id : 0
                      }`}
                      title={`upvote-${
                        upvote.id !== undefined ? upvote.id : 0
                      }`}
                    >
                      {upvote.skill.name}
                      <input
                        style={{ width: "50px" }}
                        type="number"
                        name={`upvote-${
                          upvote.id !== undefined ? upvote.id : 0
                        }`}
                        defaultValue={upvote.upvote}
                      />
                    </label>
                  ))}
                </fieldset>
              )}
            </div>
          )}
          <button
            type="submit"
            title="Mettre à jour le wilder"
            aria-label="Mettre à jour le wilder"
            className="bg-wcs-pink text-white rounded-lg p-2 hover:bg-wcs-pink-dark transition-all duration-500 ease-in-out hover:scale-95 active:scale-90 drop-shadow-md shadow-xl"
          >
            Mettre à jour
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default UpdateWilderForm;
