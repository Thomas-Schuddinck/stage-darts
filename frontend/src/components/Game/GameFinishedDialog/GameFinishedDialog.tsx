import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { NavLink } from 'react-router-dom';
import { GameFinishedialogContent } from './GameFinishedDialogContent';

export const GameFinishedDialog = (props: any) => {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        props.openReview();
        setOpen(false);
    };
    const handleReviewGame = () => {
        handleClose();
    };
    const handleOverviewGame = () => {
        
        handleClose();
    };
    const handleGoToGames = () => {
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
                <Button onClick={handleReviewGame} color="primary">
                REVIEW GAME
                </Button>
                <Button onClick={handleOverviewGame} color="primary">
                    <NavLink to={`/game/${props.id}`}>GAME OVERVIEW</NavLink>
                </Button>
                <Button onClick={handleGoToGames} color="primary">
                    <NavLink to={`/gamelist`} >GO TO GAMES</NavLink>
                </Button>
            </DialogActions>
        </Dialog>
    );
}