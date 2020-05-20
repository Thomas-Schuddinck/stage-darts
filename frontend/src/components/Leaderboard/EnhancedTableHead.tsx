import { EnhancedTableProps } from "./EnhancedTableProps";
import { TableHead, TableRow, TableCell, TableSortLabel, makeStyles } from "@material-ui/core";
import React from "react";
import { headCells } from "./HeadCells";
import { LeaderboardStats } from "../../models/LeaderboardStats";

const useStylesExtra = makeStyles(theme => ({
  bg: {
    background: 'linear-gradient(60deg,#10acf1, #1092f1)',
    '& > *': {
      color: 'white'
    }
  },
  hover: {
    '&:hover': {
      '& > *': {
        color: '#FFD700!important'
      }
    }
  }
}));

const useStyles2 = makeStyles({
  "active": { color: '#FFD700!important' },
  "root:hover": { color: '#FFD700!important' },
  "icon": { color: '#FFD700!important' }
}, { name: 'MuiTableSortLabel' });

export function EnhancedTableHead(props: EnhancedTableProps) {
  const classesSpecific = useStylesExtra();
  //wordt niet actief gebruikt => passief wel
  const classes2 = useStyles2();
  const { classes, order, orderBy, onRequestSort } = props;

  const createSortHandler = (property: keyof LeaderboardStats) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className={classesSpecific.bg}>
        {headCells.map(headCell => (
          <TableCell
            className={classesSpecific.hover}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}