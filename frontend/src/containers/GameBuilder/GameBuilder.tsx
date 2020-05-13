import React, { useState, useEffect } from 'react';
import Person from '../../components/Game/Person'
import Aux from '../../hoc/Wrap';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropagateLoader from "react-spinners/PropagateLoader";
import { GetApiCall, PutApiCall } from '../../services/ApiClient';
import LastDartThrow from '../../components/Game/LastDartThrow/LastDartThrow';
import CurrentTurn from '../../components/Game/CurrentTurn/CurrentTurn';
import { css } from "@emotion/core";
import CurrentScore from '../../components/Game/CurrentScore/CurrentScore';
import { PlayerLeg } from '../../models/PlayerLeg';
import { PlayerDetail } from '../../models/PlayerDetail';
import NumberOfWonLegs from '../../components/Game/NumberOfWonLegs/NumberOfWonLegs';
import * as signalR from "@aspnet/signalr";
import { GameDetails } from '../../models/GameDetails';
import { Status } from '../../models/Status'
import AddThrow from '../../components/Game/AddThrow/AddThrow';
import { DartThrow } from '../../models/DartThrow';
import { Environment } from '../../environment'
import HistoryComponent from '../../components/Game/History/History';
import { GameFinishedDialog } from '../../components/Game/GameFinishedDialog/GameFinishedDialog';
import { TournamentFinishedDialog } from '../../components/Game/GameFinishedDialog/TournamentFinishedDialog';

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

            background: 'linear-gradient(60deg,#10acf1, #1092f1)',
            '& *': {
                color: "#FFFFFF"
            }
        }
    },
    flexie: {
        display: 'flex',
        flexDirection: 'column',
    },
    test: {
        overflowY: 'auto',
        top: '0px',
        bottom: '0px',
    },
    hr: {
        borderColor: '#1092f1',
        borderWidth: '2px',
        marginTop: '1.5em',
        marginBottom: '4em',
        borderStyle: 'solid',
        width: '90%'

    },
}));

export const GameBuilder = (props: { match: { params: any; }; }) => {
    const classes = useStyles();
    let [size = 0, setSize] = useState<number>();
    let [gameDetails, setGameDetails] = useState<GameDetails>();
    let [isLoading, setLoading] = React.useState(true);
    let [openDialogFinishGame, setOpenDialogFinishGame] = React.useState(false);
    let [openDialogFinishTournament, setOpenDialogFinishTournament] = React.useState(false);
    let [winner, setWinner] = React.useState("-1");
    let [dialogId, setDialogId] = useState<number>();

    useEffect(() => {
        window.addEventListener('resize', updateWindowDimensions);
        setSize(window.innerWidth);
    }, []);

    const goBack = async () => {
        await PutApiCall(Environment.apiurl + '/Game/letsGoBackInTimeBaby')
    }


    const updateWindowDimensions = () => {
        setSize(window.innerWidth);
    }

    const FetchData = async (id: number) => {
        setLoading(true);
        setGameDetails(await CallToApiGame(id));
        setLoading(false);

        const connection = new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Information)
            .withUrl(Environment.apiurl + "/notify")
            .build();

        connection.start().then(function () {
        }).catch(function (err) {
            return console.error(err.toString());
        });

        connection.on("UpdateGame", (payload: Status) => {
            setGameDetails(payload.gameDTO);
            if (payload.status === 1) {
                setWinner(payload.winner);
                setDialogId(payload.gameDTO.game.tournamentId !== -1 ? payload.gameDTO.game.tournamentId : payload.gameDTO.game.id)
                if (payload.gameDTO.game.tournamentPlayable) {
                    setOpenDialogFinishTournament(true);
                } else {
                    setOpenDialogFinishGame(true);
                }
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
                    <Aux >
                        <div className={size < 499 ? classes.flexie : ""}>
                            <Grid container spacing={3} >
                                {size < 499 ?
                                    (<div></div>)
                                    :
                                    (
                                        <Grid item lg={5} xs={12} md={5}  >
                                            <AddThrow currentgame={gameDetails?.game.id} undoLastThrow={goBack} selectedThrow={selectedThrowToEdit} className={classes.test} />
                                            <hr className={classes.hr} />
                                            <HistoryComponent klein={true} game={gameDetails!.game!} />
                                        </Grid>
                                    )}
                            
                            <Grid item lg={5} xs={12} md={5} >
                                {
                                    gameDetails!.currentLegGroup!
                                        .playerLegs!.map(function (pl: PlayerLeg, i: any) {
                                            return <Grid item key={i} xs={12} md={12} lg={12} className={gameDetails?.currentPlayer.id === pl.player.id ? classes.greenBack : ""}>
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
                                                            <NumberOfWonLegs legs={
                                                                gameDetails!.game!
                                                                    .players &&
                                                                gameDetails!.game!
                                                                    .players!
                                                                    .filter(
                                                                        (p: PlayerDetail) =>
                                                                            p.playerDTO.id ===
                                                                            pl.player.id
                                                                    )[0].legsWon}></NumberOfWonLegs>
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            </Grid>
                                        }
                                        )
                                }


                            </Grid>
                            </Grid>

                            {size < 499 ? (
                                <Aux>
                                    <hr className={classes.hr} />
                                    <HistoryComponent game={gameDetails!.game!} />
                                    <AddThrow currentgame={gameDetails?.game.id} undoLastThrow={goBack} selectedThrow={selectedThrowToEdit} className={classes.test} />

                                </Aux>

                            ) : (<div></div>)}

                            {openDialogFinishGame ? (
                                <GameFinishedDialog winner={winner} id={dialogId} undoLastThrow={goBack} />
                            ) : (
                                    <div></div>
                                )}
                            {openDialogFinishTournament ? (
                                <TournamentFinishedDialog winner={winner} id={dialogId} undoLastThrow={goBack} />
                            ) : (
                                    <div></div>
                                )}
                        </div>
                    </Aux>
                )}
        </Aux>

    );
}

export default GameBuilder;