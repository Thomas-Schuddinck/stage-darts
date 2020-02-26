import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { CardHeader, CardContent, Typography, Select, MenuItem, TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Wrap from '../../hoc/Wrap';

const useStyles = makeStyles(theme => ({
    tekstHoofd: {
        alignSelf: 'center',
        color: "#004BFF",
        fontSize: '2em',
        borderBottomColor: '#004BFF',
        borderBottomWidth: 3,
        borderBottomStyle: "solid"
    },
    wide: {
        width: '1em'
    }

}));

const PersonStat = (props: any) => {
    const classes = useStyles();

    const onTagChange = (event: any, value: any) => {
        console.log(value);
        props.parentGivePlayer(value);
    }

    return (
        <Paper>
            <CardHeader title={
                <Wrap>
                        <Autocomplete
                        className={classes.wide}
                        id="combo-box-demo"
                        options={props.players.map((option: any) => option.name)}
                        style={{ width: 300 }}
                        onChange={(e: any,v: any) => onTagChange(e, v)}
                        renderInput={params => <TextField {...params} label="Player" variant="outlined"
                        />}
                        />
                </Wrap>
            } />
        </Paper>
    );

};

export default PersonStat;