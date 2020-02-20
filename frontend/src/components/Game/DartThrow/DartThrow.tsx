import React, { Component } from 'react';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
function DartThrow(props: any) {
        return (
            <ListItem button>
                <ListItemIcon>
                    <GpsFixedIcon />
                </ListItemIcon>
                <ListItemText primary="{props.score}" />
            </ListItem>
        );
        

};

export default DartThrow;