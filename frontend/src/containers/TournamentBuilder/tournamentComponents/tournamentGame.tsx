import React, { useState} from 'react';
import { Game } from '../../../models/Game';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Wrap from '../../../hoc/Wrap';
import CardBody from "../../../styledcomponents/CardBody";
import Card from "../../../styledcomponents/Card";
import { Typography } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import vs from '../../../img/vsV2.png';
import { indigo } from '@material-ui/core/colors';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    cardje: {
        padding: "0",
        margin: "0",
    },
    float: {
        textAlign: 'right',
    },
    padding: {
        padding: '1em',
    },
    tbd: {
        textAlign: 'center',
    },
    hover: {
        "&:hover": {
            cursor: "pointer",
        }
    },
    win: {
        color: 'green',
        fontWeight: 'bold',
    },
    lose: {
        color: 'red',
    },
    vs: {
        height: '65px',
    },
    status1: {
        padding: '1em',
        backgroundColor: 'grey',
        "&:hover": {
            cursor: "default",
        }
    },
    status2: {
        padding: '1em',
        "&:hover": {
            cursor: "pointer",
        }
    },
    status3: {
        padding: '1em',
        backgroundColor: indigo[50],
        "&:hover": {
            cursor: "default",
        }
    }
}));

const TournamentGame = (props: any) => {

    const classes = useStyles();
    let history = useHistory();
    let [open, setOpen] = useState(false);

    const playTourneyGame = (game: Game) => {
        if (!game.tournamentPlayable || game.isFinished) {
            setOpen(true);
        } else {
            history.push(`/game/${game.id}`);
        }
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        setOpen(false);
    };

    const createName = (game: Game) => {
        let name: JSX.Element[] = [];
        if (!game.isFinished) {
            name.push(
                <CardBody className={classes.status2}>
                    <div className={classes.hover}>
                        <Typography>{props.propsgame.players[0].playerDTO.name}</Typography>
                        <Typography className={classes.float}>
                            <img className={classes.vs} src={vs} alt="versus" />
                        </Typography>
                        <Typography>{props.propsgame.players[1].playerDTO.name}</Typography>
                    </div>
                </CardBody>
            );
        } else {
            console.log(game.players[0].legsWon);
            console.log(game.players[1].legsWon);
            console.log("-------");
            name.push(
                <CardBody className={classes.status3}>
                    <div>
                        <Typography className={game.players[0].legsWon < game.players[1].legsWon ? classes.win : classes.lose}>{props.propsgame.players[0].playerDTO.name}</Typography>
                        <Typography className={classes.float}>
                            <img className={classes.vs} src={vs} alt="versus" />
                        </Typography>
                        <Typography className={game.players[0].legsWon < game.players[1].legsWon ? classes.lose : classes.win}>{props.propsgame.players[1].playerDTO.name}</Typography>
                    </div>
                </CardBody>
            );
        }
        return name;
    }

    return (
        <Wrap>
            <Card className={classes.cardje} >
                <div onClick={() => playTourneyGame(props.propsgame)}>
                    {props.propsgame.tournamentPlayable ?
                        (
                            createName(props.propsgame)
                        ) : (
                            <CardBody className={classes.status1}>
                                <Typography className={classes.tbd}>To be determined</Typography>
                            </CardBody>
                        )
                    }
                </div>
            </Card>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">This game has already been played or still needs to be determined</Alert>
            </Snackbar>
        </Wrap>
    );

}

export default TournamentGame;