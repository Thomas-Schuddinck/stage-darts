import { LeaderboardStats } from "../../models/LeaderboardStats";

export interface HeadCell {
  id: keyof LeaderboardStats;
  label: string;
  numeric: boolean;
}