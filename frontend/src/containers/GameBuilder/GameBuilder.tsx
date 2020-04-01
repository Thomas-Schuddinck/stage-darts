import React, { useState, useEffect } from 'react';
import Person from '../../components/Game/Person'
import Aux from '../../hoc/Wrap';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropagateLoader from "react-spinners/PropagateLoader";
import { GetApiCall } from '../../services/ApiClient';
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
import { DartThrow } from '../../models/DartThrow';
import { green } from '@material-ui/core/colors';
import {Environment} from '../../environment'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
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
    },
    fixedHeightPaper: {
        overflow: 'none',
    },
    margintop: {
        marginTop: '1em'
    },
    greenBack: {
        '& .MuiPaper-rounded': {

            backgroundColor: 'green',
            '& *':{
                color: "#FFFFFF"
            }
        }
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
            .withUrl(Environment.apiurl + "/notify")
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
        return await GetApiCall(Environment.apiurl + '/Game/' + id).then(gameDetails => {
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


    let [selectedThrowToEdit, setSelectedThrowToEdit] = useState<DartThrow>();
    const getSelectedThrowFromTurn = async (tr: DartThrow) => {
        setSelectedThrowToEdit(tr);
    }

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
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={open}
                            onClose={handleClose}
                            message="GAme ended"
                        />
                        <Grid container spacing={3}>
                            {
                                gameDetails!.currentLegGroup!
                                    .playerLegs!.map(function (pl: PlayerLeg, i: any) {
                                        return <Grid item xs={12} md={6} lg={6} className={gameDetails?.currentPlayer.id === pl.player.id ? classes.greenBack : ""}>
                                            <Paper className={fixedHeightPaper}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={5} md={7} lg={7}>
                                                        <Person player={pl.player} currentplayer={gameDetails?.currentPlayer} />
                                                        <Paper className={classes.margintop}>
                                                            <LastDartThrow score={pl.turns![pl.turns!.length - 1] && pl.turns![pl.turns!.length - 1].throws!.map(t => t.value!).reduce((a, b) => a + b, 0)} />
                                                            <CurrentTurn sendThrowToBuilder={getSelectedThrowFromTurn} className={classes.currentTurn} turnnumber="2" scores={pl.turns![pl.turns!.length - 1] && pl.turns![pl.turns!.length - 1].throws && pl.turns![pl.turns!.length - 1].throws!.map(t => t)} />
                                                        </Paper>
                                                    </Grid>
                                                    <Grid item xs={7} md={5} lg={5}>
                                                        <CurrentScore score={pl.currentScore} />

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

                            <AddThrow currentgame={gameDetails?.game.id} selectedThrow={selectedThrowToEdit} />

                        </Grid>
                    </Aux>
                )}
        </Aux>
    );
}

export default GameBuilder;