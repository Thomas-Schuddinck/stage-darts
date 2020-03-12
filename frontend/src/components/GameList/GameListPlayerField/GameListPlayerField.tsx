import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Aux from '../../../hoc/Wrap';
import { Player } from "../../../models/Player";
import { PlayerDetail } from '../../../models/PlayerDetail';

const useStyles = makeStyles(theme => ({
    lijst: {
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    lijstchild: {
        margin: '0.25em 0'
      },

  
  }));
  
  
  function GameListPlayerField(props: any) {
    const classes = useStyles();
    return (
      <Aux>
        <div className={classes.lijst}>
          {props.players.map(function (s: PlayerDetail, i: any) {
            return <p className={classes.lijstchild} key={i}>{s.playerDTO.name}</p>
          }
          )}
        </div>
      </Aux>
    )
  };
  
  export default GameListPlayerField;