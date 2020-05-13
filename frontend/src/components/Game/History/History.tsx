import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Aux from '../../../hoc/Wrap';
import TurnComponent from '../Turn/Turn';
import { Turn } from '../../../models/Turn';
import { Grid, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, CardContent } from '@material-ui/core';
import Card from "../../../styledcomponents/Card";
import CardAvatar from "../../../styledcomponents/CardAvatar";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { LegGroup } from '../../../models/LegGroup';
import LegComponent from '../Leg/Leg';
import avatar from '../../../img/history.png';

const useStyles = makeStyles(theme => ({
    lijst: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    root: {
        width: '100%',
    },
    bg: {
      background: 'linear-gradient(60deg,#10acf1, #1092f1)',
      color: 'white'
    },
    martop:{
        marginTop: "1em"
    }


}));


function HistoryComponent(props: any) {
    const classes = useStyles();
    return (
        <Aux>
            <Card profile>
                <CardAvatar profile>
                    <img src={avatar} alt="..." />
                </CardAvatar>
                <CardContent>
                    {props.game!.legGroups!.map(function (lg: LegGroup, i: any) {
                        return (
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    className={classes.bg}
                                >
                                    <Typography>Leg {i + 1}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container spacing={3} className={classes.martop}>
                                        <LegComponent key={i} leggroup={lg}></LegComponent>
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        )
                    }
                    )}
                </CardContent>
            </Card>
        </Aux>
    )
};

export default HistoryComponent;