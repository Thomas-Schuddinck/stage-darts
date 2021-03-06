import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Aux from '../../hoc/Wrap';
import { Grid } from '@material-ui/core';
import { Game } from '../../models/Game';
import GameArchiveListItem from './GameArchiveListItem';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1)
    }
}));

function GameArchiveList(props: any) {
    const classes = useStyles();

    return (
        <Aux>
            <Grid container>
                {
                    props.gameList!.map(function (game: Game, i: any) {
                        return (
                            <Grid item xs={12} md={6} lg={4} className={classes.paper} key={"game-grid-li-" + i}>
                                <GameArchiveListItem game={game} key={"game-archive-li-" + i} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Aux>
    )
};

export default GameArchiveList;
