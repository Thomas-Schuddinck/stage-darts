import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import GamesIcon from '@material-ui/icons/Games';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from "react-router-dom";
import './SideList.css';

export const sideList = (
  <div>
    <Link to="/stats">
      <ListItem button>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Personal stats" />
      </ListItem>
    </Link>

    <Link to="/game">
      <ListItem button>
        <ListItemIcon>
          <GamesIcon />
        </ListItemIcon>
        <ListItemText primary="Play Game" />
      </ListItem>
    </Link>

    <Link to="/leaderbord">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Leaderbord" />
      </ListItem>
    </Link>

    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Tournament" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Quick start" />
    </ListItem>
    <Link to="/about">
      <ListItem button>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItem>
    </Link>
  </div>
);