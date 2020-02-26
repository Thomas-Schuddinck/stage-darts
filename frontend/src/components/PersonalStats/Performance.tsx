import React, { Component } from 'react';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import { CardHeader, CardContent, Typography, makeStyles, Card } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    fixedHeight: {
        height: 290,
      },
      paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },

}));

const Performance = (props: any) => {
    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <Card className={fixedHeightPaper}>
          <CardHeader title={"Performance"}></CardHeader>
          <CardContent>
          <p>Number of wins: 5</p>
          <p>Win percentage: 33%</p>
          <p>Percentage thrown tripple 20: 7%</p>
          <p>Average score of throw: 24</p>
          </CardContent>
          </Card>
    );

};


export default Performance;