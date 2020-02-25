import React, { Component } from 'react';
import Aux from '../../hoc/Wrap';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import DartsExplained from '../../components/About/DartsExplained/DartsExplained';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));



export default function AboutBuilder() {

  const classes = useStyles();


  const fixedHeightPaper = clsx(classes.paper);


  return (
    <Aux>
      <Grid container spacing={3}>
        <Grid item lg={12} xs={12} md={12}>
          <DartsExplained/>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          
        </Grid>
      </Grid>
    </Aux>
  );
}