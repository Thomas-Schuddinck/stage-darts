import { LeaderboardStats } from "../../models/LeaderboardStats";
import { useStyles } from "./LeaderBoardStyles";
import { Order } from "./OrderType";

export interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof LeaderboardStats
  ) => void;
  order: Order;
  orderBy: string;
}