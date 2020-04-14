import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ListItem} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    noPadding: {
        padding: '0',
        justifyContent: 'inherit'
    }

}));

function SimpleDartThrowComponent(props: any) {
    const classes = useStyles();

    return (
        <ListItem className={classes.noPadding}>
                <span>{props.throw.value}</span>
        </ListItem>
    );


};

export default SimpleDartThrowComponent;