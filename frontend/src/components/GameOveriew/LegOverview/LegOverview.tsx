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

                   <TableCell className={classes.td}>{legstat.player}</TableCell>
                   <TableCell className={classes.td}>{legstat.totalwins}</TableCell>
                 </TableRow>
               </TableBody>
             </Table>
            </CardBody>
            
            
          </Card>
    );

};


export default Performance;