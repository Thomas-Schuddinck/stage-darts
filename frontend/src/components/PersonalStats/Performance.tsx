import React from 'react';
import clsx from 'clsx';
import { CardHeader, CardContent, Typography, makeStyles, Card } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    fixedHeight: {
      height: '100%'
      },
      paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
      table: {
        width: '100%'
      }

}));

// numberOfMisses={stats.numberOfMisses} 
//           percentageBoardHits={stats.percentageBoardHits}

const Performance = (props: any) => {
    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <Card className={fixedHeightPaper}>
          <CardHeader title={"Performance"}></CardHeader>
          <CardContent>
            <table className={classes.table}>
              <tbody>
                <tr>
                  <td>Win rate:</td>
                  <td>{props.percentageWins}%</td>
                  <td>tripple 20:</td>
                  <td>{Number((props.numberOfSixties / props.totalNumberDartsThrown * 100).toFixed(1))}%</td>
                </tr>
                <tr>
                  <td>Average score of throw:</td>
                  <td>{Number((props.averageScoreThrown).toFixed(1))}</td>
                  <td>Total: </td>
                  <td>{props.totalScoreThrown}</td>
                </tr>
                <tr>
                  <td>Board hits: </td>
                  <td>{props.percentageBoardHits}</td>
                  <td>Misses: </td>
                  <td>{props.numberOfMisses}</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
          </Card>
    );

};


export default Performance;