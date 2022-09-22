import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useState,
  useEffect,
} from "react";
import WilderCard from "../components/WilderCard";
import axios from "axios";
import AddWilderForm from "../components/AddWilderForm";
import UpdateWilderForm from "../components/UpdateWilderForm";
import { Wilder } from "../types/Wilder";
import { Skill } from "../types/Skill";
import { Upvote } from "../types/Upvote";
import { EditWilderParams } from "../types/EditWilderParams";
import { ManageSkillsForm } from "../components/ManageSkillsForm";

const Home: React.FC = () => {
  const [wilders, setWilders] = useState<Wilder[]>([]);
  const [selectedWilderId, setSelectedWilderId] = useState<number | null>(null);
  const [wilderToUpdate, setWilderToUpdate] = useState<Wilder | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);

  const fetchWilders = async (): Promise<void> => {
    const data = await axios.get<{ data: Wilder[] }>(
      "http://localhost:5000/api/wilders"
    );
    setWilders(data.data.data);
  };

  const fetchSkills = async (): Promise<void> => {
    const data = await axios.get<{ data: Skill[] }>(
      "http://localhost:5000/api/skills"
    );
    setSkills(data.data.data);
  };

  const addWilder = async (data: Wilder): Promise<void> => {
    try {
      await axios.post<Wilder>("http://localhost:5000/api/wilders", data);
    } catch (error: any) {
      console.error(error.response.data);
      return alert(error.response.data.message);
    }
    await fetchWilders();
  };

  const editWilder = async ({
    wilder,
    upvotesToRemove,
    upvotesToUpdate,
    skillsToAdd,
  }: EditWilderParams): Promise<void> => {
    if (wilderToUpdate?.id !== undefined) {
      try {
        await axios.put<Wilder>(
          `http://localhost:5000/api/wilders/${wilderToUpdate?.id}`,
          wilder
        );
      } catch (error: any) {
        console.error(error.response.data);
        return alert(error.response.data.message);
      }
    }

    if (upvotesToRemove.length > 0) {
      try {
        upvotesToRemove.forEach(async (upvoteId) => {
          await axios.delete<Upvote>(
            `http://localhost:5000/api/upvotes/${upvoteId}`
          );
        });
      } catch (error: any) {
        console.error(error.response.data);
        return alert(error.response.data.message);
      }
    }

    if (skillsToAdd.length > 0) {
      try {
        skillsToAdd.forEach(async (skillId) => {
          if (wilderToUpdate?.id !== undefined) {
            const upvote = {
              skillId,
              wilderId: wilderToUpdate?.id,
            };
            await axios.post<Upvote>(
              "http://localhost:5000/api/upvotes",
              upvote
            );
          }
        });
      } catch (error: any) {
        console.error(error.response.data);
        return alert(error.response.data.message);
      }
    }

    if (upvotesToUpdate.length > 0) {
      try {
        upvotesToUpdate.forEach(async (upvoteToUpdate) => {
          if (wilderToUpdate?.id !== undefined) {
            const upvote = {
              upvote: upvoteToUpdate.value,
            };
            await axios.put<Upvote>(
              `http://localhost:5000/api/upvotes/${upvoteToUpdate.id}`,
              upvote
            );
          }
        });
      } catch (error: any) {
        console.error(error.response.data);
        return alert(error.response.data.message);
      }
    }
    await fetchWilders();
  };

  useEffect(() => {
    void fetchWilders();
    void fetchSkills();
  }, []);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    await addWilder({
      // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
      // @ts-ignore
      name: e.target.name.value,
      // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
      // @ts-ignore
      city: e.target.city.value,
    });
  };

  const handleDelete = async (e: MouseEvent, id: number): Promise<void> => {
    try {
      await axios.delete(`http://localhost:5000/api/wilders/${id}`);
    } catch (error: any) {
      console.error(error.response.data);
      return alert(error.response.data.message);
    }
    await fetchWilders();
  };

  const handleUpvote = async (e: MouseEvent, id: number): Promise<void> => {
    try {
      await axios.put(`http://localhost:5000/api/upvotes/${id}/upvote`);
    } catch (error: any) {
      console.error(error.response.data);
      return alert(error.response.data.message);
    }
    await fetchWilders();
  };

  const handleSelect = (wilder: Wilder): void => {
    if (selectedWilderId === wilder.id) {
      setSelectedWilderId(null);
      setWilderToUpdate(null);
      return;
    }
    if (wilder.id !== undefined) {
      setSelectedWilderId(wilder.id);
    }
    setWilderToUpdate(wilder);
  };

  const handleUpdateWilder = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const wilder: Wilder = {
      // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
      // @ts-ignore
      name: e.target.name.value,
      // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
      // @ts-ignore
      city: e.target.city.value,
    };
    // store all target values from checkboxes in a variable from e.target
    const skillsFromForm = Object.values(e.target).reduce(
      (
        acc: Array<{ id: number; checked: boolean }>,
        input: HTMLInputElement
      ) => {
        if (input.type === "checkbox" && input.name.includes("skill-")) {
          const id = parseInt(input.name.split("-")[1]);
          acc.push({ id, checked: input.checked });
        }
        return acc;
      },
      []
    );

    const upvotesFromForm = Object.values(e.target).reduce(
      (acc: Array<{ id: number; value: number }>, input: HTMLInputElement) => {
        if (input.type === "number" && input.name.includes("upvote-")) {
          const id = parseInt(input.name.split("-")[1]);
          acc.push({ id, value: parseInt(input.value) });
        }
        return acc;
      },
      []
    );

    const upvotesToRemove: number[] = [];
    const skillsToAdd: number[] = [];

    // loop through skillsFromForm and compare it to the wilderToUpdate skills
    skillsFromForm.forEach((skill: { id: number; checked: boolean }) => {
      if (wilderToUpdate?.upvotes !== undefined) {
        const UpvoteToUpdate = wilderToUpdate?.upvotes.find(
          (upvote) => upvote.skill.id === skill.id
        );

        if (UpvoteToUpdate?.id !== undefined && !skill.checked) {
          upvotesToRemove.push(UpvoteToUpdate?.id);
        }
        if (UpvoteToUpdate === undefined && skill.checked) {
          skillsToAdd.push(skill.id);
        }
      } else {
        if (skill.checked !== undefined && skill.checked) {
          skillsToAdd.push(skill.id);
        }
      }
    });

    const upvotesToUpdate = upvotesFromForm.filter((upvote: { id: number; value: number; }) => {
      if (
        wilderToUpdate?.upvotes !== undefined
      ) {
        const upvoteToUpdate = wilderToUpdate.upvotes.find(
          (upvoteToFind) => upvoteToFind.id === upvote.id
        );

        if (upvoteToUpdate !== undefined && upvoteToUpdate.upvote !== upvote.value) {
          return upvote;
        }
        return null;
      }
      return null;
    });

    await editWilder({
      wilder,
      upvotesToRemove,
      upvotesToUpdate,
      skillsToAdd,
    });
  };

  const handleDeleteSkill = async (
    e: MouseEvent,
    id: number
  ): Promise<void> => {
    try {
      await axios.delete<Skill>(`http://localhost:5000/api/skills/${id}`);
    } catch (error: any) {
      console.error(error.response.data);
      return alert(error.response.data.message);
    }
    await fetchSkills();
    setSelectedWilderId(null);
    setWilderToUpdate(null);
  };

  const handleUpdateSkill = async (
    e: ChangeEvent,
    id: number
  ): Promise<void> => {
    const skill: Skill = {
      // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
      // @ts-ignore
      name: e.target.value,
    };
    try {
      await axios.put<Skill>(`http://localhost:5000/api/skills/${id}`, skill);
    } catch (error: any) {
      console.error(error.response.data);
      return alert(error.response.data.message);
    }
    await fetchSkills();
  };

  const handleAddSkill = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const skill: Skill = {
      // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
      // @ts-ignore
      name: e.target.name.value,
    };
    try {
      await axios.post<Skill>(`http://localhost:5000/api/skills`, skill);
    } catch (error: any) {
      console.error(error.response.data);
      return alert(error.response.data.message);
    }
    await fetchSkills();
  };

  return (
    <main className="container max-w-7xl mx-auto p-5">
      <h2 className="text-slate-700 text-3xl font-bold text-center">Wilders</h2>
      <section className="flex gap-10 flex-wrap justify-center py-10">
        {wilders.length > 0 ? (
          wilders.map((wilder) => (
            <WilderCard
              key={wilder.id}
              name={wilder.name}
              city={wilder.city}
              upvotes={wilder?.upvotes}
              onDelete={(e: MouseEvent) =>
                wilder.id !== undefined && handleDelete(e, wilder.id)
              }
              onUpvote={handleUpvote}
              onSelect={() => handleSelect(wilder)}
              isSelected={selectedWilderId === wilder.id}
            />
          ))
        ) : (
          <h1>Pas de wilders à afficher</h1>
        )}
      </section>
      {selectedWilderId !== null && wilderToUpdate !== null ? (
        <UpdateWilderForm
          wilder={wilderToUpdate}
          updateWilder={handleUpdateWilder}
          skills={skills}
        />
      ) : (
        <AddWilderForm onSubmit={handleSubmit} />
      )}
      {skills.length > 0 && (
        <ManageSkillsForm
          onDelete={handleDeleteSkill}
          skills={skills}
          onUpdate={handleUpdateSkill}
          onAdd={handleAddSkill}
        />
      )}
    </main>
  );
};

export default Home;
