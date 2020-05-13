import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { NavLink } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@material-ui/core';
import { TournamentFinisheDialogContent } from './TournamentFinishedDialogContent';

export const TournamentFinishedDialog = (props: any) => {
    const [open, setOpen] = React.useState(true);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        setOpen(false);
    };

    const handleUndoLastThrow = () => {
        props.undoLastThrow();
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
            fullScreen={fullScreen}
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
        >
            <DialogTitle id="alert-dialog-title">{"Game Finished"}</DialogTitle>
            <DialogContent>
                <TournamentFinisheDialogContent id="alert-dialog-description" winner={props.winner} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleUndoLastThrow} color="primary">
                    UNDO THROW
                </Button>
                <Button onClick={handleOverviewGame} color="primary">
                    <NavLink to={`/tournament/${props.id}`}>TOURNAMENT OVERVIEW</NavLink>
                </Button>
                <Button onClick={handleGoToGames} color="primary">
                    <NavLink to={`/tournamentlist`} >GO TO TOURNAMENTS</NavLink>
                </Button>
            </DialogActions>
        </Dialog>
    );
}