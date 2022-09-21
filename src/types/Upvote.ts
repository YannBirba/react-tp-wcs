import { Skill } from "./Skill";
import { Wilder } from "./Wilder";

export interface Upvote {
  id?: number;
  upvote: number;
  skill: Skill;
  wilder: Wilder;
}
