import { makeStyles, Table, TableRow, TableCell, TableBody } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import CardHeader from "../../../styledcomponents/CardHeader";
import CardBody from "../../../styledcomponents/CardBody";
import Card from "../../../styledcomponents/Card";
import { LegWinner } from '../../../models/LegWinner';
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

const LegOverview = (props: any) => {
  const classes = useStyles();
  console.log(props.legwinners);
  return (
    <Card>
      <CardHeader color="warning">
        <h4>Leg Overview</h4>
      </CardHeader>
      <CardBody>
        <Table className={classes.table}>
          <TableBody>
            {
              
              props.legwinners.map(function (legstat: LegWinner, i: any) {
                return (<TableRow className={classes.tr}>
                  <TableCell className={classes.td}>{legstat.playerName}</TableCell>
                  <TableCell className={classes.td}>{legstat.aantal}</TableCell>
                </TableRow>
                )
              }
              )
            }



          </TableBody>
        </Table>
      </CardBody>


    </Card>
  );

};


export default LegOverview;