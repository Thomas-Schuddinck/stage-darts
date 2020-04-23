import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Aux from '../../hoc/Wrap';
import { Chip } from '@material-ui/core';

import FaceIcon from '@material-ui/icons/Face';
import { Player } from '../../models/Player';

const useStyles = makeStyles(theme => ({
  lijst: {
    display: 'flex',
    overflow: '',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  lijstchild: {
    margin: '0.25em 0'
  },


}));


function TournamentListPlayerField(props: any) {
  const classes = useStyles();
  return (
    <Aux>
      
      <div className={classes.lijst}>
        {props.players.map(function (s: Player, i: any) {

          return <Chip
            icon={<FaceIcon />}
            label={s.name}
            variant="outlined"
          />
        }
        )}
      </div>
    </Aux>
  )
};

export default TournamentListPlayerField;