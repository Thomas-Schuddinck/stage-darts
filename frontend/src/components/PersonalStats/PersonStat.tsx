import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardContent, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Player } from '../../models/Player';

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
        width: '100%'
    },
    height: {
        height: 88
    }

}));

const PersonStat = (props: any) => {
    const classes = useStyles();

    const onTagChange = (event: any, value: any) => {
        props.parentGivePlayer(value);
    }

    return (
        <Card className={classes.height}>
            <CardContent>
                <Autocomplete
                        className={classes.wide}
                        id="combo-box-demo"
                        options={props.players}
                        getOptionLabel={(option: Player) => option.name!}
                        style={{ width: 300 }}
                        onChange={(e: any,v: any) => onTagChange(e, v)}
                        renderInput={params => <TextField {...params} label="Player" variant="outlined"
                        />}
                        />
            </CardContent>
                        
                
          
        </Card>
    );

};

export default PersonStat;