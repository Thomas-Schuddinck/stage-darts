import React, {Component} from 'react';
import Person from '../../components/PersonalStats/Person'
import Aux from '../../hoc/Wrap';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
      fixedHeight: {
        height: 240,
      },
}));



    export default function PersonalStatsBuilder () {

        const classes = useStyles();


        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


        return (
            <Aux>
                <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                <Person/>
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                <Person/>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <p>history?</p>
                <p>heatmap?</p>
              </Paper>
            </Grid>
          </Grid>
            </Aux>
        );
    }