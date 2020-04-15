import { Card, CardContent, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, makeStyles, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import CardHeader from "../../../styledcomponents/CardHeader";
import CardBody from "../../../styledcomponents/CardBody";

const useStyles = makeStyles(theme => ({
      paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
      win: {
        color: 'green',
      },
      lose: {
        color: 'red',
      },
      back: {
    
      }

}));

const History = (props: any) => {
    const classes = useStyles();

    return (
        <Card className={classes.paper}>
            <CardHeader color="primary">
              <h4>
                History
              </h4>
            </CardHeader>
            <CardContent>
              <ExpansionPanel className={classes.back}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading + ' ' + classes.win}>vs Thomas</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    gegevens over deze specifieke match? Bv sets: 3 - 1, of is sets het enige en zetten we dit naast de naam?
          </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>

              <ExpansionPanel className={classes.back}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading + ' ' + classes.lose}>vs Rik</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>

                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>


            </CardContent>
          </Card>
    );

};


export default History;