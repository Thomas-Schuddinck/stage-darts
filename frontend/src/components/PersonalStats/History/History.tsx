import { CardContent, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import CardHeader from "../../../styledcomponents/CardHeader";
import CardBody from "../../../styledcomponents/CardBody";
import Card from "../../../styledcomponents/Card";
import { Game } from '../../../models/Game';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }, heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  win: {
    color: 'green',
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  lose: {
    color: 'red',
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  back: {
  },
  tr: {
    borderBottom: 'solid purple 0.2em'
  },
  hover: {
    '&:hover': {
      cursor: 'pointer',
    }
  }

}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    [theme.breakpoints.up('sm')]: {
      padding: 16,
    },
    padding: 2,
  },
  body: {
    padding: 2,
    [theme.breakpoints.up('sm')]: {
      fontSize: 14,
      padding: 16,
    },
  },
  table: {
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
      minWidth: 450,
    },
  },
  
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);



const History = (props: any) => {
  const classes = useStyles();
  
  let history = useHistory();
  const navigateToOverview = (id: number) => {
    history.push(`/Overview/${id}`);
  }
  const createHistory = () => {
    let table: JSX.Element[] = [];
    props.history!.forEach((game: Game) => {
      table.push(
        <ExpansionPanel className={classes.back}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {createTitle(game)}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.hover} onClick={() => navigateToOverview(game.id)}>
          <Table aria-label="customized table">
          <TableBody>
            {createDetail(game)}
            </TableBody>
            </Table>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    });
    return table;
  }

  const createTitle = (game: Game) => {
    let typgraf: JSX.Element[] = [];
    let title = "vs ";
    let teller = 0;
    let won = false;
    let winner = "";
    let mostlegs = 0;

    game.players!.forEach(pl => {
      if(!(pl === undefined)) {
        if(pl.legsWon > mostlegs)
          winner = pl.playerDTO.name;
      }
        
    });

    game.players.forEach(pl => {
      if (!(pl.playerDTO.name === props.player.name)) {
        teller++;
        if (teller <= 1)
          title += pl.playerDTO.name + " ";
        else
          title += "and " + pl.playerDTO.name + " ";
      }
    });
    typgraf.push(<Typography className={winner === props.player.name ? classes.win: classes.lose}>{title}</Typography>);
    return typgraf;
  }

  const createDetail = (game: Game) => {
    let detail: JSX.Element[] = [];
    game.players.forEach(pl => {
      detail.push(
        <StyledTableRow className={classes.tr}>
          <StyledTableCell component="th" scope="row">
            {pl.playerDTO.name}
          </StyledTableCell>
          <StyledTableCell component="th" scope="row">
            {pl.legsWon}
          </StyledTableCell>
        </StyledTableRow>
      )
    })
    return detail;
  }

  return (
    <Card>
      <CardHeader color="primary">
        <h4>
          History
              </h4>
      </CardHeader>
      <CardContent>
            {createHistory()}
      </CardContent>
    </Card>
  );

};


export default History;