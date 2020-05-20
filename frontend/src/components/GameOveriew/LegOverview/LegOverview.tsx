import { makeStyles, Table, TableRow, TableCell, TableBody } from '@material-ui/core';
import React from 'react';
import CardHeader from "../../../styledcomponents/CardHeader";
import CardBody from "../../../styledcomponents/CardBody";
import Card from "../../../styledcomponents/Card";
import { LegWinner } from '../../../models/LegWinner';

const useStyles = makeStyles(theme => ({
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

const LegOverview = (props: any) => {
  const classes = useStyles();

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