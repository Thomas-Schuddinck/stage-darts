import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { PlayerListItem } from './PlayerListItem';
import { Player } from '../../models/Player';
import { Grid } from '@material-ui/core';



const useStyles = makeStyles(theme => ({


}));

export const PlayerList = (props: any) => {
    const classes = useStyles();




    return (
        
            <Grid container spacing={1}>

            {props.players && props.players.map(function (p: Player, i: any) {
                return <PlayerListItem key={i} player={p}  />
            }
            )}

            </Grid>

        

    );
}

export default PlayerList;
