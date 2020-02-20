import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DownloadFile from "../../services/PlayerService"

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


export default function Leaderbord() {
  const classes = useStyles();

  function testing() {
      DownloadFile();
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Player</StyledTableCell>
            <StyledTableCell align="right">#Wins</StyledTableCell>
            <StyledTableCell align="right">Tripple20%</StyledTableCell>
            <StyledTableCell align="right">Average/throw</StyledTableCell>
            <StyledTableCell align="right">Win%</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                Thomas
              </StyledTableCell>
              <StyledTableCell align="right">3</StyledTableCell>
              <StyledTableCell align="right">1</StyledTableCell>
              <StyledTableCell align="right">4</StyledTableCell>
              <StyledTableCell align="right">5</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                Wouter
              </StyledTableCell>
              <StyledTableCell align="right">50</StyledTableCell>
              <StyledTableCell align="right">30</StyledTableCell>
              <StyledTableCell align="right">42</StyledTableCell>
              <StyledTableCell align="right">82</StyledTableCell>
            </StyledTableRow>
          
        </TableBody>
      </Table>
      <Button onClick={testing}>TESTTING</Button>
    </TableContainer>
  );
}
