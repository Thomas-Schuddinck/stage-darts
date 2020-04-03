import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Aux from '../../../hoc/Wrap';
import SimpleDartThrowComponent from '../SimpleDartThrow/SimpleDartThrow';
import LastDartThrow from '../LastDartThrow/LastDartThrow';
import { Paper } from '@material-ui/core';
import { DartThrow } from '../../../models/DartThrow';

const useStyles = makeStyles(theme => ({
    lijst: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }

}));




function TurnComponent(props: any) {
    const classes = useStyles();

    return (
        <Paper className={classes.lijst}>
            <LastDartThrow score={props.turn.throws!.map((t: DartThrow) => t.value!).reduce((a: any, b: any) => a + b, 0)} />
            {props.scores && props.turn.throws.map(function (t: DartThrow, i: any) {
                return <SimpleDartThrowComponent key={i} throw={t} />
            }
            )}
            
            </Paper>
  )
};

export default TurnComponent;
