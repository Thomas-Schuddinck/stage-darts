import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Aux from '../../hoc/Wrap';
import { Chip, Grid } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';

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
  fullsize: {
    width: '100%'
  }
}));

function GameListPlayerField(props: any) {
  const classes = useStyles();

  return (
    <Aux>
      <Grid container className={classes.lijst}>
        {props.players.map(function (s: any, i: any) {
          return <Grid item xs={6} md={4} lg={4} key={i}>
            <Chip
              icon={<FaceIcon />}
              label={s.name}
              key={"chip" + i}
              variant="outlined"
              className={classes.fullsize}
            />
          </Grid>
        }
        )}
      </Grid>
    </Aux>
  )
};

export default GameListPlayerField;