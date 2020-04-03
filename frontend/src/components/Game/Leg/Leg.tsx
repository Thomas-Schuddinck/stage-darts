import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Aux from '../../../hoc/Wrap';
import { Player } from "../../../models/Player";
import { PlayerDetail } from '../../../models/PlayerDetail';
import { PlayerLeg } from '../../../models/PlayerLeg';
import TurnComponent from '../Turn/Turn';
import PlayerLegComponent from '../PlayerLeg/PlayerLeg';

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
  
  
  function LegComponent(props: any) {
    const classes = useStyles();
    return (
      <Aux>
        <div className={classes.lijst}>
          {props.leggroup.playerLegs.map(function (s: PlayerLeg, i: any) {
            return <PlayerLegComponent key={i} playerleg={s}></PlayerLegComponent>
          }
          )}
        </div>
      </Aux>
    )
  };
  
  export default LegComponent;