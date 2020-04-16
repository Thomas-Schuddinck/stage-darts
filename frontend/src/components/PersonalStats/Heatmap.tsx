import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import DartsBoardLogo from '../About/DartBoardLogo/DartBoardLogo';
import CardHeader from "../../styledcomponents/CardHeader";
import CardBody from "../../styledcomponents/CardBody";
import Card from "../../styledcomponents/Card";

const useStyles = makeStyles(theme => ({
    fixedHeight: {
        height: 'auto',
      },
      paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
      logo: {
        width: '66%',
        margin: '0 auto',
      },

}));

const Heatmap = (props: any) => {
    const classes = useStyles();


    return (
        <Card>
            <CardHeader color="info">
              <h4>Heatmap</h4>
            </CardHeader>
            <CardBody>
                <div className={classes.logo}>
                    <DartsBoardLogo/>
                </div>
            </CardBody>
        </Card>
    );

};


export default Heatmap;