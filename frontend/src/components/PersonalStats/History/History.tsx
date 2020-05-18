import { CardContent, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import CardHeader from "../../../styledcomponents/CardHeader";
import Card from "../../../styledcomponents/Card";
import { Game } from '../../../models/Game';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MobileStepper from '@material-ui/core/MobileStepper';

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
  },
  placeholdr: {
    textAlign: 'center',
    padding: '1em',
    marginLeft: '1em',
    marginRight: '1em',
    marginBottom: '1em',
    borderBottom: '1px solid purple',
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: '#e7f7fe',
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
    }
  },
  table: {
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
      minWidth: 450,
    }
  }
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
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = Math.ceil(props.history!.length / 4);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  let history = useHistory();
  const navigateToOverview = (id: number) => {
    history.push(`/Overview/${id}`);
  }

  const navigateTonNewGame = () => {
    history.push(`/new-game/`);
  }

  const createHistory = () => {
    let table: JSX.Element[] = [];
    for (let teller = props.history!.length - 1 - (4 * activeStep); teller > props.history!.length - 5 - (4 * activeStep); teller--) {
      const game = props.history![teller];
      if (!game) { break; }
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
    };
    return table;
  }

  const createTitle = (game: Game) => {
    let typgraf: JSX.Element[] = [];
    let title = "vs ";
    let teller = 0;
    let winner = "";
    let mostlegs = 0;

    game.players!.forEach(pl => {
      if (!(pl === undefined)) {
        if (pl.legsWon > mostlegs){
          mostlegs = pl.legsWon;
          winner = pl.playerDTO.name;
        }          
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
    typgraf.push(<Typography className={winner === props.player.name ? classes.win : classes.lose}>{title}</Typography>);
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
        <h4>History</h4>
      </CardHeader>
      <CardContent>
        {createHistory()}
      </CardContent>
      {
        maxSteps > 1 ? (
          <MobileStepper
            steps={maxSteps}
            position="static"
            variant="text"
            activeStep={activeStep}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>} />
        )
          : (
            null
          )
      }
          {props.history!.length! === 0 ? (<Typography onClick={() => navigateTonNewGame()} className={classes.placeholdr}>click here to make and play your first game!</Typography>) : (null)}
    </Card>
  );
};

export default History;