import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, Grid, Button } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import Wrap from '../../../hoc/Wrap'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

const useStyles = makeStyles(theme => ({
    leg: {
        fontSize: '1.5em',
        color: indigo[700],
        [theme.breakpoints.up('sm')]: {
            fontSize: '2em',
        },
    },
    button: {
        backgroundColor: indigo[600],
        border: '0.1em solid black',
        color: 'white',
        width: '100%',
        minWidth: '0',
    },
    wrap: {
        position: 'fixed',
        bottom: '0',
        width: '100%',
        left: '0',
        right: '0'
    },
    photo: {
        color: "#FFFFFF",
        backgroundColor: '#C4151C',
        width: '100%',
        minWidth: '0',
        border: '0.1em solid black',
    }
}));

const AddThrow = (props: any) => {
    const classes = useStyles();

    let [size = 0, setSize] = useState<number>();

    useEffect(() => {
        window.addEventListener('resize', updateWindowDimensions);
        setSize(window.innerWidth);
    }, []);

    const updateWindowDimensions = () => {
        setSize(window.innerWidth);
    }

    const createButtons = () => {
        let container = [];
        let buttons = [];
        for (let i = 1; i <= 20; i++) {
            buttons.push(
                <Grid item xs={2} md={2} lg={2}>
                    <Button className={classes.button} key={i}>{i}</Button>
                </Grid>
            )
        }
        container.push(
            <Wrap>
                {buttons}
            </Wrap>
        )
        return container;
    }

    return (
        <Wrap>

        {size < 499 ? (<Grid className={classes.wrap} container>
            {createButtons()}
            <Grid item xs={2} md={2} lg={2}>
                <Button className={classes.button}>25</Button>
            </Grid>
            <Grid item xs={2} md={2} lg={2}>
                <Button className={classes.button}>D</Button>
            </Grid>
            <Grid item xs={2} md={2} lg={2}>
                <Button className={classes.button}>T</Button>
            </Grid>
            <Grid item xs={2} md={2} lg={2}>
                <Button className={classes.photo}><AddAPhotoIcon /></Button>
            </Grid>
        </Grid>): (null)}

        </Wrap>

            
        

        
    );

};


export default AddThrow;