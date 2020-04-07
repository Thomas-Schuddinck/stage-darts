import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogContentText, TextField, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({

    buttonstyle: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0px',
        margin: '0 auto'
    },
    flexie: {

        display: 'flex',
        flexDirection: 'column',
        '& *': {
            margin: '0px',
            padding: '0px'
        }
    },
    buttons: {
        display: 'flex',
        alignContent: 'space-between',
        margin: '0 auto'
    }


}));
export const GameReviewDialog = (props: any) => {
    const classes = useStyles();
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
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Review Game</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Change the last throw and keep playing after applying new score
            <h4>Or</h4>
            finish the game and go to overview
          </DialogContentText>
                <Grid container>
                    <Grid item xs={12} md={5}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="area"
                            label="Area hit"
                            type="nisharea"
                            required

                        />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <TextField
                            margin="dense"
                            id="multi"
                            label="Multiplier"
                            type="number"
                            required
                        />
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions className={classes.buttons}>
                <Button onClick={handleClose} color="primary">
                    <div className={classes.flexie}>
                        <h2>Re-evaluate</h2>
                        <h5>and keep playing</h5>
                    </div>
                </Button>
                <Button onClick={handleClose} color="primary" className={classes.buttonstyle}>
                    <div className={classes.flexie}>

                        <h2>Ignore</h2>
                        <h5>and finish game</h5>
                    </div>
                </Button>
            </DialogActions>
        </Dialog>
    );
}