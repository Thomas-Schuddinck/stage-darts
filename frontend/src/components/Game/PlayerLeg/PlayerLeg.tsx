import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Aux from '../../../hoc/Wrap';
import TurnComponent from '../Turn/Turn';
import { Turn } from '../../../models/Turn';
import { Grid } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    lijst: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    },

  
  }));
  
  
  function PlayerLegComponent(props: any) {
    const classes = useStyles();
    return (
      <Aux>
          
        <Grid className={classes.lijst}>
          {props.playerleg.turns.map(function (s: Turn, i: any) {
            return <TurnComponent key={i} beurt={i+1} turn={s} ></TurnComponent>
          }
          )}
        </Grid>
      </Aux>
    )
  };
  
  export default PlayerLegComponent;