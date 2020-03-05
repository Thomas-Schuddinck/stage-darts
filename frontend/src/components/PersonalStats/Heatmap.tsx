import { Card, CardHeader, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import DartsBoardLogo from '../About/DartBoardLogo/DartBoardLogo';

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

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <Card className={fixedHeightPaper}>
            <CardHeader title={"Heatmap"}></CardHeader>
            
                <div className={classes.logo}>
                    <DartsBoardLogo/>
                </div>
            
        </Card>
    );

};


export default Heatmap;