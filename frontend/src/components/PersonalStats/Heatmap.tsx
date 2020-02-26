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

const Heatmap = (props: any) => {
    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <Card className={fixedHeightPaper}>
            <CardHeader title={"Heatmap"}></CardHeader>
        </Card>
    );

};


export default Heatmap;