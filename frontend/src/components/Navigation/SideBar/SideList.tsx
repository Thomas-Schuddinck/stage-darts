import { MenuItem } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import indigo from '@material-ui/core/colors/indigo';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import BarChartIcon from '@material-ui/icons/BarChart';
import GamesIcon from '@material-ui/icons/Games';
import InfoIcon from '@material-ui/icons/Info';
import LayersIcon from '@material-ui/icons/Layers';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import ListAltIcon from '@material-ui/icons/ListAlt';
import React from 'react';
import { NavLink } from "react-router-dom";
import './SideList.css';

const useStyles = makeStyles(theme => ({
    itemLi: {
      height: '3em',
      paddingLeft: '23.25px' 
    },
    icon: {
      color: grey[600],
    },
    active: {
      color: indigo[500],
      '& $icon': {
        color: indigo[500],
       },
    }
}));


export const SideList = () => {
  
  const classes = useStyles();
    
  return (
  <div>
    <NavLink to="/stats" activeClassName={classes.active}>
      <MenuItem className={classes.itemLi}       >
        <ListItemIcon>
          <PersonIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary="Personal stats" />
      </MenuItem>
    </NavLink>

    <NavLink activeClassName={classes.active} to="/game">
      <MenuItem className={classes.itemLi}>
        <ListItemIcon className={classes.icon}>
          <GamesIcon/>
        </ListItemIcon>
        <ListItemText primary="Play Game" />
      </MenuItem>
    </NavLink>

    <NavLink activeClassName={classes.active} to="/new-game">
      <MenuItem className={classes.itemLi}>
        <ListItemIcon className={classes.icon}>
          <GamesIcon/>
        </ListItemIcon>
        <ListItemText primary="New Game" />
      </MenuItem>
    </NavLink>

    <NavLink activeClassName={classes.active} to="/gamelist">
      <MenuItem className={classes.itemLi}>
        <ListItemIcon className={classes.icon}>
          <ListAltIcon/>
        </ListItemIcon>
        <ListItemText primary="Active Games" />
      </MenuItem>
    </NavLink>

    <NavLink activeClassName={classes.active} to="/leaderbord" >
      <MenuItem className={classes.itemLi}>
        <ListItemIcon className={classes.icon}>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Leaderbord" />
      </MenuItem>
    </NavLink>

<NavLink activeClassName={classes.active} to='/tournament'>
    <MenuItem className={classes.itemLi}>
      <ListItemIcon className={classes.icon}>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Tournament" />
    </MenuItem>
    </NavLink>

<NavLink activeClassName={classes.active} to='/quickstart'>
    <MenuItem className={classes.itemLi}>
      <ListItemIcon className={classes.icon}>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Quick start" />
    </MenuItem>
    </NavLink>
    <NavLink activeClassName={classes.active} to="/about">
      <MenuItem className={classes.itemLi}>
        <ListItemIcon className={classes.icon}>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </MenuItem>
    </NavLink>
  </div>
  )
  };
  export default SideList;