import { MenuItem } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import InfoIcon from '@material-ui/icons/Info';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ArchiveIcon from '@material-ui/icons/Archive';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import React from 'react';
import { NavLink } from "react-router-dom";
import './SideList.css';
import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles(theme => ({
  itemLi: {
    height: '3em',
    paddingLeft: '23.25px'
  },
  icon: {
    color: grey[600],
  },
  active: {
    color: '#0d84d9',
    '& $icon': {
      color: '#0d84d9',
    },
  },
  blue: {
    borderTop: '2px solid #6fbef6',
  }
}));

export const SideList = (props: any) => {
  const classes = useStyles();

  const sendClick = async () => {
    props.sendClickToToolbar();
  }

  return (
    <div>
      <NavLink activeClassName={classes.active} to="/new-game" onClick={() => sendClick()}>
        <MenuItem className={classes.itemLi}>
          <ListItemIcon className={classes.icon}>
            <AddCircleIcon/>
          </ListItemIcon>
          <ListItemText primary="New Game" />
        </MenuItem>
      </NavLink>
      <NavLink activeClassName={classes.active} to="/new-player" onClick={() => sendClick()}>
        <MenuItem className={classes.itemLi}>
          <ListItemIcon className={classes.icon}>
            <PersonAddIcon />
          </ListItemIcon>
          <ListItemText primary="New Player" />
        </MenuItem>
      </NavLink>
      <hr className={classes.blue}/>
      <NavLink activeClassName={classes.active} to="/gamelist" onClick={() => sendClick()}>
        <MenuItem className={classes.itemLi}>
          <ListItemIcon className={classes.icon}>
            <SportsEsportsIcon/>
          </ListItemIcon>
          <ListItemText primary="Active Games" />
        </MenuItem>
      </NavLink>
      <NavLink activeClassName={classes.active} to="/tournamentlist" onClick={() => sendClick()}>
        <MenuItem className={classes.itemLi}>
          <ListItemIcon className={classes.icon}>
            <EmojiEventsIcon />
          </ListItemIcon>
          <ListItemText primary="Active Tournaments" />
        </MenuItem>
      </NavLink>
      <hr className={classes.blue}/>
      <NavLink to="/stats" activeClassName={classes.active} onClick={() => sendClick()}>
        <MenuItem className={classes.itemLi}       >
          <ListItemIcon>
            <PersonIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="Player statistics" />
        </MenuItem>
      </NavLink>
      <NavLink activeClassName={classes.active} to="/leaderbord" onClick={() => sendClick()}>
        <MenuItem className={classes.itemLi}>
          <ListItemIcon className={classes.icon}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Leaderbord" />
        </MenuItem>
      </NavLink>
      <NavLink activeClassName={classes.active} to="/archive" onClick={() => sendClick()}>
        <MenuItem className={classes.itemLi}>
          <ListItemIcon className={classes.icon}>
            <ArchiveIcon />
          </ListItemIcon>
          <ListItemText primary="Archive" />
        </MenuItem>
      </NavLink>
      <hr className={classes.blue}/>
      <NavLink activeClassName={classes.active} to="/about" onClick={() => sendClick()}>
        <MenuItem className={classes.itemLi}>
          <ListItemIcon className={classes.icon}>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </MenuItem>
      </NavLink>
      <NavLink activeClassName={classes.active} to="/info" onClick={() => sendClick()}>
        <MenuItem className={classes.itemLi}>
          <ListItemIcon className={classes.icon}>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="How to configure" />
        </MenuItem>
      </NavLink>
    </div>
  )
};

export default SideList;