import { HeadCell } from "./HeadCell";

export const headCells: HeadCell[] = [
    {
      id: "player",
      numeric: false,
      label: "Player"
    },
    { 
        id: "numberOfWins",
        numeric: true, 
        label: "# Wins" 
    },
    {
        id: "percentageWins", 
        numeric: true, 
        label: "% Wins" 
    },
    { 
        id: "percentageSixties", 
        numeric: true,
        label: "% 60's" 
    },
    { 
        id: "totalScoreThrown", 
        numeric: true,
        label: "total score" 
    }
  ];