import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Aux from '../../../hoc/Wrap';
import { DartThrow } from '../../../models/DartThrow';

import DartThrowComponent from '../DartThrow/DartThrowComponent';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'row',
    backgroundColor: '#FFD700'

  },
  lijst: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  icoon: {
    color: "#004BFF",
    fontSize: '2.5em',
    marginRight: '1.5em'

  },
  tekstHoofd: {
    alignSelf: 'center',
    color: "#004BFF",
    fontSize: '2em',
    paddingLeft: '0.7em',
    paddingRight: '0.7em',
    marginTop: '0'

  },

}));




function CurrentTurn(props: any) {
  const classes = useStyles();

  const getThrowFromChild = async (tr: DartThrow) => {
    props.sendThrowToBuilder(tr);
  }

  return (
    <Aux>
      <div className={classes.lijst}>
        {props.scores && props.scores.map(function (s: any, i: any) {
          return <DartThrowComponent key={i} score={s} sendThrowToParent={getThrowFromChild} />
        }
        )}
      </div>
    </Aux>
  )
};

export default CurrentTurn;
