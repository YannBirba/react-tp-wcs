import { Wilder } from "./Wilder";

export interface EditWilderParams {
  wilder: Wilder;
  upvotesToRemove: number[];
  upvotesToUpdate: Array<{
    id: number;
    value: number;
  }>;
  skillsToAdd: number[];
}
