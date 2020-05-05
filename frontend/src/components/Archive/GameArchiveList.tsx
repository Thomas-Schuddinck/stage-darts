import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Aux from '../../hoc/Wrap';
import { Grid } from '@material-ui/core';
import { Game } from '../../models/Game';
import GameArchiveListItem from './GameArchiveListItem';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'row',
        backgroundColor: '#FFD700'

    }

}));




function GameArchiveList(props: any) {
    const classes = useStyles();

    
    console.log(props.gameList)
    return (
        <Aux>
            <Grid container>
                {
                    props.gameList!.map(function(game: Game, i: any) {
                        return (<Grid item xs={12} md={6} lg={4}><GameArchiveListItem game={game} /></Grid>)
                    })
                }


            </Grid>
        </Aux>
    )
};

export default GameArchiveList;
