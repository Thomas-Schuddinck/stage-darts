import { Card, makeStyles, Typography } from '@material-ui/core';
import React from 'react';


const useStyles = makeStyles(theme => ({
    centerText: {
        textAlign: 'right'
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
    },
    height: {
        height: 88
    }

}));

const WinLoss = (props: any) => {
    const classes = useStyles();

    return (
        <Card className={classes.height}>
            
                <table className={classes.table}>
                    <tbody>
                        <tr>
                            
                            <td><Typography className={classes.big}>Wins</Typography></td>
                            <td><Typography className={classes.big}>Losses</Typography></td>
                            
                        </tr>
                        <tr>
                            <td><Typography className={classes.content}>{props.wins}</Typography></td>
                            <td><Typography className={classes.content}>{props.losses}</Typography></td>
                        </tr>
                    </tbody>
                </table>
            

        </Card>
    );

};


export default WinLoss;