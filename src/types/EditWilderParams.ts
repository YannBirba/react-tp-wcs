import { Wilder } from "./Wilder";

export interface EditWilderParams {
  wilder: Wilder;
  upvotesToRemove: number[];
  upvotesToUpdate: {
    id: number;
    value: number;
  }[];
  skillsToAdd: number[];
}
