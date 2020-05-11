import React, { useEffect, useState } from 'react';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { GetApiCall } from '../../services/ApiClient';
import PropagateLoader from "react-spinners/PropagateLoader";
import Wrap from '../../hoc/Wrap';
import { css } from "@emotion/core";
import { LeaderboardStats } from '../../models/LeaderboardStats';
import { Environment } from '../../environment';
import { TablePagination, withStyles } from '@material-ui/core';
import { useStyles } from '../../components/Leaderboard/LeaderBoardStyles';
import { EnhancedTableHead } from '../../components/Leaderboard/EnhancedTableHead';
import { Order } from '../../components/Leaderboard/OrderType';
import { stableSort, getComparator } from '../../components/Leaderboard/LeaderBoardComparator';



export default function LeaderBoard() {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof LeaderboardStats>("numberOfWins");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  let [rows, setLeaderboardStats] = useState<LeaderboardStats[]>();
  let [isLoading, setLoading] = React.useState(true);

  const FetchData = async () => {
    setLoading(true);
    setLeaderboardStats(await CallToApiLeaderboardStats());
    setLoading(false);
  }

  useEffect(() => {
    FetchData();
  }, []);

  const CallToApiLeaderboardStats = async (): Promise<LeaderboardStats[]> => {
    return await GetApiCall(Environment.apiurl + '/leaderboard').then(playerswithstats => {
      return playerswithstats;
    });
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof LeaderboardStats
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const spinner = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-left: 50%;
`;
  return (
    <Wrap>
      {isLoading ? (
        <PropagateLoader
          css={spinner}
          size={20}
          color={"#123abc"}
        />
      ) : (
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={"medium"}
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {stableSort(rows!, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            tabIndex={-1}
                            key={row.player}
                          >
                            <TableCell
                              id={labelId}
                              scope="row"
                              align="left"
                            >
                              {row.player}
                            </TableCell>
                            <TableCell align="right">{row.numberOfWins}</TableCell>
                            <TableCell align="right">{row.percentageWins.toFixed(2)}%</TableCell>
                            <TableCell align="right">{row.percentageSixties.toFixed(2)}%</TableCell>
                            <TableCell align="right">{row.totalScoreThrown}</TableCell>
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={rows!.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        )}
    </Wrap>

  );
}
