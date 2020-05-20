import { makeStyles, Typography, Table, TableRow, TableCell, TableBody } from '@material-ui/core';
import React from 'react';
import CardHeader from "../../styledcomponents/CardHeader";
import CardBody from "../../styledcomponents/CardBody";
import Card from "../../styledcomponents/Card";

const useStyles = makeStyles(theme => ({
    centerText: {
        textAlign: 'center'
    },
    table: {
        width: '100%',
        textAlign: 'center',
    },
    big: {
        fontSize: '1.7em'
    },
    content: {
        fontSize: '1.4em'
    }
}));

const WinLoss = (props: any) => {
    const classes = useStyles();

    return (
        <Card>
            <CardHeader color="success">
                <h4>Wins/losses</h4>
            </CardHeader>
            <CardBody>
                <Table className={classes.table}>
                    <TableBody>
                        <TableRow>
                            <TableCell className={classes.centerText}><Typography className={classes.big}>Wins</Typography></TableCell>
                            <TableCell className={classes.centerText}><Typography className={classes.big}>Losses</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.centerText}><Typography className={classes.content}>{props.wins}</Typography></TableCell>
                            <TableCell className={classes.centerText}><Typography className={classes.content}>{props.losses}</Typography></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardBody>
        </Card>
    );
};

export default WinLoss;