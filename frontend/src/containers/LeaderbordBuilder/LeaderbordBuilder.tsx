import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import GetApiCall from '../../services/ApiClient';
import { Player } from '../../models/Player';
import PropagateLoader from "react-spinners/PropagateLoader";
import Wrap from '../../hoc/Wrap';
import { css } from "@emotion/core";
import { LeaderboardStats } from '../../models/LeaderboardStats';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Leaderbord = () => {
  const classes = useStyles();

  let [leaderboardStats, setLeaderboardStats] = useState<LeaderboardStats[]>();
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
    return await GetApiCall('http://localhost:5000/leaderboard').then(playerswithstats => {
      return playerswithstats;
    });
  }

  const createTable = () => {
    let table: JSX.Element[] = [];
    leaderboardStats!.forEach((lb: any) => {
      table.push(
        <StyledTableRow>
          <StyledTableCell component="th" scope="row">
            {lb.player.name}
          </StyledTableCell>
          <StyledTableCell align="center">{lb.numberOfWins}</StyledTableCell>
          <StyledTableCell align="center">{lb.percentageWins}%</StyledTableCell>
          <StyledTableCell align="center">{lb.percentageSixties}%</StyledTableCell>
          <StyledTableCell align="center">{lb.totalScoreThrown}</StyledTableCell>
        </StyledTableRow>
      )
    });
    return table;
  }

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
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Player</StyledTableCell>
                  <StyledTableCell align="center">#Wins</StyledTableCell>
                  <StyledTableCell align="center">Win%</StyledTableCell>
                  <StyledTableCell align="center">hit 60 %</StyledTableCell>
                  <StyledTableCell align="center">total score thrown</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {createTable()}
              </TableBody>
            </Table>
          </TableContainer>
        )}
    </Wrap>

  );
}

export default Leaderbord;
