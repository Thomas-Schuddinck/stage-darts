import { makeStyles, Table, TableRow, TableCell, TableBody } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import CardHeader from "../../styledcomponents/CardHeader";
import CardBody from "../../styledcomponents/CardBody";
import Card from "../../styledcomponents/Card";
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
    return (
        <Card>
            <CardHeader color="warning">
              <h4>Performance</h4>
            </CardHeader>
            <CardBody>
            <Table className={classes.table}>
               <TableBody>
                 <TableRow className={classes.tr}>
                   <TableCell className={classes.td}>Win rate:</TableCell>
                   <TableCell>{props.percentageWins}%</TableCell>
                   <TableCell className={classes.td}>tripple 20:</TableCell>
                   <TableCell>{Number((props.numberOfSixties / props.totalNumberDartsThrown * 100).toFixed(1))}%</TableCell>
                 </TableRow>
                 <TableRow className={classes.tr}> 
                   <TableCell className={classes.td}>Average score of throw:</TableCell>
                   <TableCell>{Number((props.averageScoreThrown).toFixed(1))}</TableCell>
                   <TableCell className={classes.td}>Total: </TableCell>
                   <TableCell>{props.totalScoreThrown}</TableCell>
                 </TableRow>
                 <TableRow className={classes.tr}>
                   <TableCell className={classes.td}>Board hits: </TableCell>
                   <TableCell>{Number((props.percentageBoardHits).toFixed(1))}%</TableCell>
                   <TableCell className={classes.td}>Misses: </TableCell>
                   <TableCell>{props.numberOfMisses}</TableCell>
                 </TableRow>
               </TableBody>
             </Table>
            </CardBody>
            
            
          </Card>
    );

};


export default Performance;