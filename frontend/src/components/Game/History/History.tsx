import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Aux from '../../../hoc/Wrap';
import TurnComponent from '../Turn/Turn';
import { Turn } from '../../../models/Turn';
import { Grid, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { LegGroup } from '../../../models/LegGroup';
import LegComponent from '../Leg/Leg';
const useStyles = makeStyles(theme => ({
    lijst: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    root: {
        width: '100%',
      },


}));


function HistoryComponent(props: any) {
    const classes = useStyles();
    return (
        <Aux>

<div className={classes.root}>
                {props.game!.legGroups!.map(function (lg: LegGroup, i: any) {
                    return (
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Leg {i+1}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <Grid container spacing={3}>
                                <LegComponent key={i} leggroup={lg}></LegComponent>
                            </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                }
                )}
            </div>
        </Aux>
    )
};

export default HistoryComponent;