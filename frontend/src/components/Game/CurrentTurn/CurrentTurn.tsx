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
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'row',
    
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
      borderBottomColor: '#004BFF',
      borderBottomWidth: 3,
      borderBottomStyle: "solid"
      
  },
  
}));


function CurrentTurn(props: any) {
  const classes = useStyles();
  return (
    <Aux>
      <span className={classes.tekstHoofd}>Turn {props.turnnumber}</span>
      <div className={classes.lijst}>
        {props.scores.map((s: any) =>
          <DartThrow score={s} />
        )}
      </div>
      
    </Aux>

  )

};

export default CurrentTurn;
