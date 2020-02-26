import React, { Component, useState, useEffect } from 'react';
import Aux from '../../hoc/Wrap';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import PersonStat from '../../components/PersonalStats/PersonStat';
import WinLoss from '../../components/PersonalStats/WinLoss';
import Heatmap from '../../components/PersonalStats/Heatmap';
import Performance from '../../components/PersonalStats/Performance';
import History from '../../components/PersonalStats/History/History';
import GetApiCall from '../../services/ApiClient';
import { Player } from '../../models/Player';


const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 290,
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  win: {
    color: 'green',
  },
  lose: {
    color: 'red',
  },
  back: {

  }
}));



const PersonalStatsBuilder = () => {

  let [players, setPlayers] = useState();
  let [stats, setStats] = useState();
  let [isLoading, setLoading] = React.useState(true);

  const FetchData = async () => {

    setLoading(true);

    setPlayers(await CallToApiPlayers());

    setLoading(false);

  }

  useEffect(() => {
    FetchData();
  }, []);

  const CallToApiPlayers = async (): Promise<Player[]> => {
    return await GetApiCall('http://localhost:5000/Player').then(players => {
      return players;
    });
  }

  let [childPlayer, setChildPlayer] = useState();

  const getPlayerChild = (childPlayer: any) => {
    setChildPlayer(childPlayer);
  }

  const classes = useStyles();


  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Aux>
      {isLoading? (<p>loading</p>): (
        <Grid container spacing={3}>
        <Grid item lg={5} xs={5} md={5}>
          <PersonStat parentGivePlayer={getPlayerChild} players={players}></PersonStat>
        </Grid>
        <Grid item lg={7} xs={7} md={7}>
          <WinLoss wins={"7"} losses={"6"}></WinLoss>
        </Grid>
        {/* heatmap? */}
        <Grid item xs={12} md={5} lg={5}>
          <Heatmap></Heatmap>
        </Grid>
        {/* Performance */}
        <Grid item xs={12} md={7} lg={7}>
          <Performance></Performance>
        </Grid>
        {/* history */}
        <Grid item xs={12}>
          <History></History>
        </Grid>
      </Grid>
      )}
      
    </Aux>
  );
}

export default PersonalStatsBuilder;


