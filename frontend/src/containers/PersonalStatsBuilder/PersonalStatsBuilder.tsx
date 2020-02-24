import React, { Component } from 'react';
import Aux from '../../hoc/Wrap';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Card, CardHeader, CardContent } from '@material-ui/core';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 290,
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  win: {
    color: 'green',
  },
  lose: {
    color: 'red',
  }
}));



export default function PersonalStatsBuilder() {

  const classes = useStyles();


  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


  return (
    <Aux>
      <Grid container spacing={3}>
        <Grid item lg={12} xs={12} md={12}>
          <h2>Wouter</h2>
        </Grid>
            {/* heatmap? */}
        <Grid item xs={12} md={4} lg={4}>
          <Card className={fixedHeightPaper}>
            <CardHeader title={"Heatmap"}></CardHeader>
            <CardContent></CardContent>
          </Card>
        </Grid>
        {/* Performance */}
        <Grid item xs={12} md={8} lg={8}>
          <Card className={fixedHeightPaper}>
          <CardHeader title={"Performance"}></CardHeader>
          <CardContent>
          <p>Number of wins: 5</p>
          <p>Win percentage: 33%</p>
          <p>Percentage thrown tripple 20: 7%</p>
          <p>Average score of throw: 24</p>
          </CardContent>
          </Card>
        </Grid>
        {/* history */}
        <Grid item xs={12}>
          <Card className={classes.paper}>
          <CardHeader title={"History"}></CardHeader>
          <CardContent>

          <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading + ' ' + classes.win}>vs Thomas</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            gegevens over deze specifieke match? Bv sets: 3 - 1, of is sets het enige en zetten we dit naast de naam?
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading + ' ' + classes.lose}>vs Rik</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
        

          </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Aux>
  );
}