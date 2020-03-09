import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Aux from '../../../hoc/Wrap';
import DartThrow from '../DartThrow/DartThrow';

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
    overflow: 'auto',
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
  return (
    <Aux>
      <div className={classes.lijst}>
        {props.scores.map(function (s: any, i: any) {
          return <DartThrow key={i} score={s} />
        }
        )}
      </div>
    </Aux>
  )
};

export default CurrentTurn;
