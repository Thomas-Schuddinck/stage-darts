import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

function PlayingNext(props: any) {
        return (
            <Paper elevation={0}>

                <li>Playing next: {props.name}</li>
            </Paper>
        );

};

export default PlayingNext;