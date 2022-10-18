import React, { FormEvent } from "react";
import XMarkicon from "@heroicons/react/24/outline/XMarkicon";

interface AddWilderFormProps {
  onSubmit: (e: FormEvent) => void;
  isOpen: boolean;
  setIsOpen: () => void;
}

const AddWilderForm: React.FC<AddWilderFormProps> = ({
  onSubmit,
  isOpen,
  setIsOpen,
}) => {
  return (
    <div className="fixed flex items-center justify-center bg-black/75 min-h-screen min-w-full inset-0 z-50">
      <dialog
        open={isOpen}
        className="bg-slate-50 rounded-xl p-10 flex flex-col gap-3 drop-shadow"
      >
        <button
          className="absolute right-4 top-4 rounded-full p-1 hover:bg-wcs-pink hover:text-white transition-all duration-500 ease-in-out"
          onClick={setIsOpen}
        >
          <XMarkicon width={20} />
        </button>

        <h1 className="text-xl font-semibold text-slate-700">
          Ajouter un wilder
        </h1>
        <form
          aria-label="Ajouter un nouveau wilder"
          onSubmit={onSubmit}
          className="flex flex-col gap-2"
        >
          <label htmlFor="name">Entrer un nom pour le wilder</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            title="Entrer le nom du wilder"
            aria-label="Préciser le nom du wilder"
          />
          <label htmlFor="city">Entrer une ville pour le wilder</label>
          <input
            id="city"
            name="city"
            type="text"
            placeholder="New york"
            title="Entrer la ville du wilder"
            aria-label="Préciser la ville du wilder"
          />
          <button
            type="submit"
            aria-label="Enregistrer le wilder"
            title="Sauvegarder le nouveau wilder"
            className="bg-wcs-pink text-white rounded-lg p-2 hover:bg-wcs-pink-dark transition-all duration-500 ease-in-out hover:scale-95 active:scale-90 drop-shadow-md shadow-xl"
          >
            Enregistrer
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default AddWilderForm;
