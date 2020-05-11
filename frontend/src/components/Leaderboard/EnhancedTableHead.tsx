import { EnhancedTableProps } from "./EnhancedTableProps";
import { TableHead, TableRow, TableCell, TableSortLabel } from "@material-ui/core";
import React from "react";
import { headCells } from "./HeadCells";
import { LeaderboardStats } from "../../models/LeaderboardStats";

export function EnhancedTableHead(props: EnhancedTableProps) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof LeaderboardStats) => (
      event: React.MouseEvent<unknown>
    ) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map(headCell => (
            <TableCell
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