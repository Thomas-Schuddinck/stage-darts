import React, { useState, useEffect } from 'react';
import Person from '../../components/Game/Person'
import Aux from '../../hoc/Wrap';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropagateLoader from "react-spinners/PropagateLoader";
import GetApiCall from '../../services/ApiClient';
import LastDartThrow from '../../components/Game/LastDartThrow/LastDartThrow';
import CurrentTurn from '../../components/Game/CurrentTurn/CurrentTurn';
import { css } from "@emotion/core";
import TakePhoto from '../../components/Game/TakePhoto/TakePhoto';
import CurrentScore from '../../components/Game/CurrentScore/CurrentScore';
import { PlayerLeg } from '../../models/PlayerLeg';
import { PlayerDetail } from '../../models/PlayerDetail';
import Legs from '../../components/Game/Legs/Legs';
import * as signalR from "@aspnet/signalr";
import { GameDetails } from '../../models/GameDetails';
import { Status } from '../../models/Status'
import AddThrow from '../../components/Game/AddThrow/AddThrow';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },

    alignFlex: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    alignFlexChildren: {
        margin: 'auto'
    },
    centerContent: {
        alignItems: "center",
    },
    currentTurn: {
        overflow: 'auto',
    }
}));


export const GameBuilder = (props: { match: { params: any; }; }) => {


    const classes = useStyles();
    let [gameDetails, setGameDetails] = useState<GameDetails>();
    let [isLoading, setLoading] = React.useState(true);
    const [state, setState] = React.useState({
        open: false
    })
    const { open } = state;
    const handleStatus = () => {
        setState({ open: true });
      };
    
      const handleClose = () => {
        setState({ open: false });
      };

    const FetchData = async (id: number) => {
        setLoading(true);
        setGameDetails(await CallToApiGame(id));


        setLoading(false);


        const connection = new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Information)
            .withUrl("https://localhost:5000/notify")
            .build();

        connection.start().then(function () {
            console.log('Connected!');
        }).catch(function (err) {
            return console.error(err.toString());
        });

        connection.on("UpdateGame", (payload: Status) => {
            console.log(payload);
            setGameDetails(payload.gameDTO);
            if (payload.status === 1) {
                handleStatus();
            }
        });

    }

    useEffect(() => {

        if (props.match.params.id) {
            FetchData(props.match.params.id);
        } else {
            FetchData(1);
        }
    }, []);

    const CallToApiGame = async (id: number): Promise<GameDetails> => {
        return await GetApiCall('https://localhost:5000/Game/' + id).then(gameDetails => {
            console.log("dit is de game");
            console.log(gameDetails)
            return gameDetails;
        });
    }

    const fixedHeightPaper = clsx(classes.paper, classes.centerContent);

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
                    <Aux>
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
                            open={open}
                            onClose={handleClose}
                            message="GAme ended"
                        />
                        <Grid container spacing={3}>
                            {
                                gameDetails!.game!.legGroups && gameDetails!.game!.legGroups![gameDetails!.game!.legGroups!.length - 1] && gameDetails!.game!
                                    .legGroups![gameDetails!.game!.legGroups!.length - 1]
                                    .playerLegs!.map(function (pl: PlayerLeg, i: any) {
                                        return <Grid item xs={12} md={6} lg={6}>
                                            <Paper className={fixedHeightPaper}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={5} md={4} lg={4}>
                                                        <Person player={pl.player} currentplayer={gameDetails?.currentPlayer} />
                                                        <CurrentScore score={pl.currentScore} />
                                                    </Grid>
                                                    <Grid item xs={7} md={8} lg={8}>
                                                        <Paper>
                                                            <LastDartThrow score={pl.turns![pl.turns!.length - 1] && pl.turns![pl.turns!.length - 1].throws!.map(t => t.value!).reduce((a, b) => a + b, 0)} />
                                                            <CurrentTurn className={classes.currentTurn} turnnumber="2" scores={pl.turns![pl.turns!.length - 1] && pl.turns![pl.turns!.length - 1].throws && pl.turns![pl.turns!.length - 1].throws!.map(t => t.value)} />
                                                        </Paper>
                                                        <Legs legs={
                                                            gameDetails!.game!
                                                                .players &&
                                                            gameDetails!.game!
                                                                .players!
                                                                .filter((p: PlayerDetail) =>
                                                                    p.playerDTO.id ===
                                                                    pl.player.id)[0].legsWon}></Legs>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                    }


                                    )
                            }

                            <AddThrow />
                        </Grid>
                        {/* <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={6}>
                                <Paper>
                                    <TakePhoto />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
                                <Paper>
                                    <TakePhoto />
                                </Paper>
                            </Grid>
                        </Grid> */}
                    </Aux>
                )}
        </Aux>
    );
}

export default GameBuilder;