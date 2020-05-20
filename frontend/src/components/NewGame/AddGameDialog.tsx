import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { NavLink } from 'react-router-dom';

export const AddGameDialog = (props: any) => {
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
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
    >
      <DialogTitle id="alert-dialog-title">{"Game Created"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Your game was succesfully created. Do you want to:
          </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleStartGame} color="primary">
          <NavLink to={`/game/${props.id}`} >START GAME</NavLink>
        </Button>
        <Button onClick={handleGoToGame} color="primary" autoFocus>
          <NavLink to={`/gamelist`} >GO TO GAMES</NavLink>
        </Button>
      </DialogActions>
    </Dialog>
  );
}