import Grid from '@material-ui/core/Grid';

import React from 'react';
import DartsExplained from '../../components/About/DartsExplained/DartsExplained';
import { ShortInfoGroup } from '../../components/About/ShortInfoGroup/ShortInfoGroup';
import Aux from '../../hoc/Wrap';
/*
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));
*/



export default function AboutBuilder() {

  //const classes = useStyles();

  return (
    <Aux>
      <Grid container spacing={3}>
          
        <Grid item lg={9} xs={12} md={9}>
          <DartsExplained/>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <ShortInfoGroup></ShortInfoGroup>
        </Grid>
        
      </Grid>
    </Aux>
  );
}