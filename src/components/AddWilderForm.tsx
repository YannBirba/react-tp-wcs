import React, { FormEvent } from "react";

interface AddWilderFormProps {
  onSubmit: (e: FormEvent) => void;
}

const AddWilderForm: React.FC<AddWilderFormProps> = ({ onSubmit }) => {
  return (
    <>
      <h1>Ajouter un wilder</h1>
      <form aria-label="Ajouter un nouveau wilder" onSubmit={onSubmit}>
        <label htmlFor="name">Entrer un nom pour le wilder</label>
        <br />
        <input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          title="Entrer le nom du wilder"
          aria-label="Préciser le nom du wilder"
        />
        <br />
        <label htmlFor="city">Entrer une ville pour le wilder</label>
        <br />
        <input
          id="city"
          name="city"
          type="text"
          placeholder="New york"
          title="Entrer la ville du wilder"
          aria-label="Préciser la ville du wilder"
        />
        <br />
        <button
          type="submit"
          aria-label="Enregistrer le wilder"
          title="Sauvegarder le nouveau wilder"
        >
          Enregistrer
        </button>
        <br />
      </form>
    </>
  );
};

export default AddWilderForm;
