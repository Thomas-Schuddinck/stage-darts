import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { NavLink } from 'react-router-dom';
import { GameFinishedialogContent } from './GameFinishedDialogContent';

export const GameFinishedialog = (props: any) => {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };
    const handleStartGame = () => {
        setOpen(false);
    };
    const handleGoToGame = () => {
        handleClose();
    };

    return (

        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Game Finished"}</DialogTitle>
            <DialogContent>
                <GameFinishedialogContent id="alert-dialog-description" winner={props.winner} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleStartGame} color="primary">
                REVIEW GAME
                </Button>
                <Button onClick={handleStartGame} color="primary">
                    <NavLink to={`/game/${props.id}`}>GAME OVERVIEW</NavLink>
                </Button>
                <Button onClick={handleGoToGame} color="primary" autoFocus>
                    <NavLink to={`/gamelist`} >GO TO GAMES</NavLink>
                </Button>
            </DialogActions>
        </Dialog>
    );
}