import React, { useState } from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import GamesIcon from '@material-ui/icons/Games';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import ListItem from '@material-ui/core/ListItem';
import { Link } from "react-router-dom";
import './SideList.css';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { MenuItem, createMuiTheme } from '@material-ui/core';
import { inherits } from 'util';


const theme = createMuiTheme({
  overrides: {
    MuiMenuItem: {
     root: {
      '&$selected': {
        backgroundColor: 'red',
       },
      },
      
    },
  },
});

const useStyles = makeStyles(theme => ({
    itemLi: {
      height: '3em',
    },
}));


export const SideList = () => {
  
  const classes = useStyles();
  
  let [selected, setSelected] = useState();



  
  return (
  <div>
    <Link to="/stats">
      <MenuItem className={classes.itemLi} button onClick={() => setSelected(0)} selected={selected === 0}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Personal stats" />
      </MenuItem>
    </Link>

    <Link to="/game">
      <MenuItem className={classes.itemLi} button onClick={() => setSelected(1)} selected={selected === 1}>
        <ListItemIcon>
          <GamesIcon/>
        </ListItemIcon>
        <ListItemText primary="Play Game" />
      </MenuItem>
    </Link>

    <Link to="/leaderbord">
      <MenuItem className={classes.itemLi} button onClick={() => setSelected(2)} selected={selected === 2}>
        <ListItemIcon key={8}>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Leaderbord" />
      </MenuItem>
    </Link>

    <MenuItem className={classes.itemLi} button onClick={() => setSelected(3)} selected={selected === 3}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Tournament" />
    </MenuItem>
    <MenuItem className={classes.itemLi} button onClick={() => setSelected(4)} selected={selected === 4}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Quick start" />
    </MenuItem>
  </div>
  )
  };
  export default SideList;