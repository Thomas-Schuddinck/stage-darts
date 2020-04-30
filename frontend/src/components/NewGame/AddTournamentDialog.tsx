import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { NavLink } from 'react-router-dom';

export  const AddTournamentDialog = (props: any) =>  {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  const handleTournamentGame = () => {
    setOpen(false);
  };
  const handleGoToTournament = () => {
    handleClose();
  };

  return (
    
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Tournament Created"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your Tournament was succesfully created. Do you want to:
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTournamentGame} color="primary">
          <NavLink to={`/tournament/${props.id}`} >START Tournament</NavLink>
          </Button>
          <Button onClick={handleGoToTournament} color="primary" autoFocus>
          <NavLink to={`/tournamentlist`} >GO TO TOURNAMENTS</NavLink>
          </Button>
        </DialogActions>
      </Dialog>
  );
}