import React from 'react';
import { Typography, makeStyles, Grid, Button } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
    leg: {
        fontSize: '1.5em',
        color: indigo[700],
        [theme.breakpoints.up('sm')]: {
            fontSize: '2em',
          },
    },
}));

const AddThrow = (props: any) => {
    const classes = useStyles();
    return (
    <Grid container spacing={1}>
        <Grid item xs={1} md={1} lg={1}>
            <Button>1</Button>
        </Grid>
        <Grid item xs={1} md={1} lg={1}>
            <Button>1</Button>
        </Grid>
        <Grid item xs={1} md={1} lg={1}>
            <Button>1</Button>
        </Grid>
        <Grid item xs={1} md={1} lg={1}>
            <Button>1</Button>
        </Grid>
        <Grid item xs={1} md={1} lg={1}>
            <Button>1</Button>
        </Grid>
        <Grid item xs={1} md={1} lg={1}>
            <Button>1</Button>
        </Grid>
        <Grid item xs={1} md={1} lg={1}>
            <Button>1</Button>
        </Grid>
        <Grid item xs={1} md={1} lg={1}>
            <Button>1</Button>
        </Grid>
        <Grid item xs={1} md={1} lg={1}>
            <Button>1</Button>
        </Grid>
        <Grid item xs={1} md={1} lg={1}>
            <Button>1</Button>
        </Grid>
        <Grid item xs={1} md={1} lg={1}>
            <Button>1</Button>
        </Grid>
        <Grid item xs={1} md={1} lg={1}>
            <Button>1</Button>
        </Grid>
    </Grid>
    );

};


export default AddThrow;