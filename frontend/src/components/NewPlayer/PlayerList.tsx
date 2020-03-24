import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { PlayerListItem } from './PlayerListItem';
import { Player } from '../../models/Player';



const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
    
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        '& *':{
            margin: '20px'

        }
        

    },

}));

export const PlayerList = (props: any) => {
    const classes = useStyles();




    return (
        <div className={classes.paper}>
            {props.players && props.players.map(function (p: Player, i: any) {
                return <PlayerListItem key={i} player={p}  />
            }
            )}
        </div>

    );
}

export default PlayerList;
