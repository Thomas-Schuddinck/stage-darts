import { CardContent, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, makeStyles, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import CardHeader from "../../../styledcomponents/CardHeader";
import CardBody from "../../../styledcomponents/CardBody";
import Card from "../../../styledcomponents/Card";
import { Game } from '../../../models/Game';

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
  },
  lose: {
    color: 'red',
  },
  back: {

  }

}));

const History = (props: any) => {
  const classes = useStyles();

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
          <ExpansionPanelDetails>
            {createDetail(game)}
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
    game.players.forEach(pl => {
      if (!(pl.playerDTO.name === props.player.name)) {
        teller++;
        if (teller <= 1)
          title += pl.playerDTO.name + " ";
        else
          title += "and " + pl.playerDTO.name + " ";
      }
    });
    typgraf.push(<Typography className={classes.heading + ' ' + classes.win}>{title}</Typography>);
    return typgraf;
  }

  const createDetail = (game: Game) => {
    let detail: JSX.Element[] = [];
    detail.push(
      <Typography>aa</Typography>
    );
    return detail;
  }

  return (
    <Card className={classes.paper}>
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