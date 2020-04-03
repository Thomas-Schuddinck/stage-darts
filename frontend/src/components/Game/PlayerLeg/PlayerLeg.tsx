import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Aux from '../../../hoc/Wrap';
import { Player } from "../../../models/Player";
import { PlayerDetail } from '../../../models/PlayerDetail';
import { PlayerLeg } from '../../../models/PlayerLeg';
import TurnComponent from '../Turn/Turn';
import { Turn } from '../../../models/Turn';


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
  
  
  function PlayerLegComponent(props: any) {
    const classes = useStyles();
    return (
      <Aux>
        <div className={classes.lijst}>
          {props.playerleg.map(function (s: Turn, i: any) {
            return <TurnComponent turn={s}></TurnComponent>
          }
          )}
        </div>
      </Aux>
    )
  };
  
  export default PlayerLegComponent;