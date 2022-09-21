import { Upvote } from "./Upvote";

export interface Wilder {
  id?: number;
  name: string;
  city?: string;
  upvotes?: Upvote[]
}