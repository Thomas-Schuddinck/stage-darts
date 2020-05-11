import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Aux from '../../hoc/Wrap';
import { Grid } from '@material-ui/core';
import TournamentArchiveListItem from './TournamentArchiveListItem';
import { Game } from '../../models/Game';
import { Tournament } from '../../models/Tournament';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),

    }

}));




function TournamentArchiveList(props: any) {
    const classes = useStyles();


    return (
        
        <Aux>
            <Grid container>
                {
                    props.tournamentList!.map(function(tournament: Tournament, i: any) {
                        return (<Grid item xs={12} md={6} lg={4} className={classes.paper}><TournamentArchiveListItem tournament={tournament} /></Grid>)
                    })
                }


            </Grid>
        </Aux>
    )
};

export default TournamentArchiveList;
