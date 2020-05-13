import React, { useState, useEffect } from 'react';
import Aux from '../../hoc/Wrap';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import PersonStat from '../../components/PersonalStats/PersonStat';
import WinLoss from '../../components/PersonalStats/WinLoss';
import Performance from '../../components/PersonalStats/Performance';
import History from '../../components/PersonalStats/History/History';
import { GetApiCall } from '../../services/ApiClient';
import { Player } from '../../models/Player';
import { Stats } from '../../models/Stats';
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/core";
import { Environment } from '../../environment';

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

  },
  alignstretch: {
    display: 'flex',
    alignItems: 'stretch'
  },
  stretch: {

  }
}));

const PersonalStatsBuilder = () => {

  let [players, setPlayers] = useState<Player[]>();
  let [stats, setStats] = useState<Stats>();
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
    return await GetApiCall(Environment.apiurl + '/Player').then(players => {
      return players;
    });
  }

  const CallToApiStats = async (player: Player): Promise<Stats> => {
    return await GetApiCall(Environment.apiurl + '/Player/stats/' + player.id).then(stats => {
      return stats;
    });
  }

  let [childPlayer, setChildPlayer] = useState<Player>();

  const getPlayerChild = async (childPlayer: Player) => {
    setChildPlayer(childPlayer);
    console.log('this is the player that is undefined: ' + childPlayer)
    setStats(await CallToApiStats(childPlayer));

  }

  const classes = useStyles();
  const spinner = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-left: 50%;
`;

  return (
    <Aux>
      {isLoading ? (
        <PropagateLoader
          css={spinner}
          size={20}
          color={"#123abc"}
        />
      ) : (
          <Grid className={classes.alignstretch} container spacing={3}>
            <Grid item lg={5} xs={12} md={5}>
              <PersonStat parentGivePlayer={getPlayerChild} players={players}></PersonStat>
            </Grid>
            <Grid item lg={7} xs={12} md={7}>
              {stats === undefined ? (<p></p>) : (
                <WinLoss wins={stats.numberOfWins} losses={stats.numberOfLosses}></WinLoss>
              )}
            </Grid>

            {/* history */}
            <Grid item xs={12} md={5} lg={5}>
              {stats === undefined ? (<p></p>) : (
                <History history={stats.history} player={childPlayer}></History>
              )}
            </Grid>

            {/* Performance */}
            <Grid item xs={12} md={7} lg={7}>
              {stats === undefined ? (<p></p>) : (
                <Performance
                  numberOfMisses={stats.numberOfMisses}
                  numberOfSixties={stats.numberOfSixties}
                  totalScoreThrown={stats.totalScoreThrown}
                  totalNumberDartsThrown={stats.totalNumberDartsThrown}
                  averageScoreThrown={stats.averageScoreThrown}
                  percentageWins={stats.percentageWins}
                  percentageBoardHits={stats.percentageBoardHits}
                  percentageSixties={stats.percentageSixties}
                ></Performance>
              )}
            </Grid>



          </Grid>
        )}
    </Aux>
  );
}

export default PersonalStatsBuilder;


