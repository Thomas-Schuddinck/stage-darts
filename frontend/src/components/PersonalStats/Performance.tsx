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
        [theme.breakpoints.up('sm')]: {
          padding: 16,
        },
        padding: 4,
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
                   <TableCell className={classes.td}>{Number(props.percentageWins.toFixed(1))}%</TableCell>
                   <TableCell className={classes.td}>tripple 20:</TableCell>
                   <TableCell className={classes.td}>{Number(props.percentageSixties.toFixed(1))}%</TableCell>
                 </TableRow>
                 <TableRow className={classes.tr}> 
                   <TableCell className={classes.td}>Average score of throw:</TableCell>
                   <TableCell className={classes.td}>{Number((props.averageScoreThrown).toFixed(1))}</TableCell>
                   <TableCell className={classes.td}>Total: </TableCell>
                   <TableCell className={classes.td}>{props.totalScoreThrown}</TableCell>
                 </TableRow>
                 <TableRow className={classes.tr}>
                   <TableCell className={classes.td}>Board hits: </TableCell>
                   <TableCell className={classes.td}>{Number((props.percentageBoardHits).toFixed(1))}%</TableCell>
                   <TableCell className={classes.td}>Misses: </TableCell>
                   <TableCell className={classes.td}>{props.numberOfMisses}</TableCell>
                 </TableRow>
               </TableBody>
             </Table>
            </CardBody>
            
            
          </Card>
    );

};


export default Performance;