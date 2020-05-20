import React from 'react';
import { PlayerListItem } from './PlayerListItem';
import { Player } from '../../models/Player';
import { Grid } from '@material-ui/core';

export const PlayerList = (props: any) => {

    return (
        <Grid container spacing={1}>
            {props.players && props.players.map(function (p: Player, i: any) {
                return <PlayerListItem key={i} player={p} />
            }
            )}
        </Grid>
    );
}

export default PlayerList;
