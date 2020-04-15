import { Card, CardContent, makeStyles, Table } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import CardHeader from "../../styledcomponents/CardHeader";
import CardBody from "../../styledcomponents/CardBody";

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
        width: '100%',
      },
      td: {

      },
      tr: {
        borderBottom: 'solid orange 0.2em'
      }

}));

// numberOfMisses={stats.numberOfMisses} 
//           percentageBoardHits={stats.percentageBoardHits}

const Performance = (props: any) => {
    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <Card>
            <CardHeader color="warning">
              <h4>Performance</h4>
            </CardHeader>
            <CardBody>
            <table className={classes.table}>
               <tbody>
                 <tr className={classes.tr}>
                   <td className={classes.td}>Win rate:</td>
                   <td>{props.percentageWins}%</td>
                   <td className={classes.td}>tripple 20:</td>
                   <td>{Number((props.numberOfSixties / props.totalNumberDartsThrown * 100).toFixed(1))}%</td>
                 </tr>
                 <tr className={classes.tr}> 
                   <td className={classes.td}>Average score of throw:</td>
                   <td>{Number((props.averageScoreThrown).toFixed(1))}</td>
                   <td className={classes.td}>Total: </td>
                   <td>{props.totalScoreThrown}</td>
                 </tr>
                 <tr className={classes.tr}>
                   <td className={classes.td}>Board hits: </td>
                   <td>{Number((props.percentageBoardHits).toFixed(1))}%</td>
                   <td className={classes.td}>Misses: </td>
                   <td>{props.numberOfMisses}</td>
                 </tr>
               </tbody>
             </table>
            </CardBody>
            
            
          </Card>
    );

};


export default Performance;