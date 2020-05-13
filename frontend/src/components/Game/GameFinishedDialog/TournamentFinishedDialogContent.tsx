import { makeStyles } from '@material-ui/core/styles';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFD700'
    },
    icoon: {
        color: "#004BFF",
        fontSize: '7em',
        marginRight: '1.5em'
    },
    tekst: {
        alignSelf: 'center',
        color: "#004BFF",
        fontSize: '4em',
    },
}));


export const TournamentFinisheDialogContent = (props: any) => {
    const classes = useStyles();

    return (
        <Grid container spacing={2} className={classes.paper}>
            <Grid item xs={5} md={5} lg={5}>
                <EmojiEventsIcon className={classes.icoon} />
            </Grid>
            <Grid item xs={5} md={5} lg={5}>
                <span className={classes.tekst}>{props.winner} won!</span>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Alert severity="error">If there was a throw incorrect and the game was finished incorrect, click <strong>UNDO THROW</strong> to undo the last throw and continue the game.</Alert>
            </Grid>
        </Grid>
    );
}