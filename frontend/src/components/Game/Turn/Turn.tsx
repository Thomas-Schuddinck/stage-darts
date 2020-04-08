import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Aux from '../../../hoc/Wrap';
import SimpleDartThrowComponent from '../SimpleDartThrow/SimpleDartThrow';
import LastDartThrow from '../LastDartThrow/LastDartThrow';
import { Paper, Grid } from '@material-ui/core';
import { DartThrow } from '../../../models/DartThrow';
import Person from '../Person';
import CurrentTurn from '../CurrentTurn/CurrentTurn';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '1em',
      },
    lijst: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    lijst2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    tekstHoofd: {
        alignSelf: 'center',
        color: "#004BFF",
        fontSize: '1.6em',
    }

}));




function TurnComponent(props: any) {
    const classes = useStyles();

    return (
            <Grid className={classes.root} container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.lijst}>
                        <h4 className={classes.tekstHoofd}>Beurt {props.beurt}</h4>
                        <Paper>
                            <LastDartThrow score={props.turn.throws!.map((t: DartThrow) => t.value!).reduce((a: any, b: any) => a + b, 0)} />
                            <div className={classes.lijst2}>
                                {props.turn.throws!.map(function (t: DartThrow, i: any) {
                                    return <SimpleDartThrowComponent key={i} throw={t} />
                                }


                                )}
                            </div>

                        </Paper>
                    </Paper>
                </Grid>
            </Grid>

    )

};

export default TurnComponent;
