import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, Grid, Button } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import Wrap from '../../../hoc/Wrap'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import PostApiCall from '../../../services/ApiClientPost';

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
        "&:hover": {
            backgroundColor: indigo[200],
        }
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
    },
    buttonSelected: {
        color: 'black',
        backgroundColor: indigo[200],
        width: '100%',
        minWidth: '0',
        border: '0.1em solid black',
    }
}));

const AddThrow = (props: any) => {
    const classes = useStyles();

    let [size = 0, setSize] = useState<number>();
    let [tripple = false, setTripple] = useState<boolean>();
    let [double = false, setDouble] = useState<boolean>();

    useEffect(() => {
        window.addEventListener('resize', updateWindowDimensions);
        setSize(window.innerWidth);
    }, []);

    const updateWindowDimensions = () => {
        setSize(window.innerWidth);
    }

    const PostThrowCall = async (value: string) => {
        let val = parseInt(value);

        if (double)
            val = val * 2;
        if (tripple)
            val = val * 3;

        setDouble(false);
        setTripple(false);
        console.log(val);
        return await PostApiCall('https://localhost:5000/Game/game', val.toString()).then(resp => {
            console.log(resp);
        });
    }

    const createButtons = () => {
        let container = [];
        let buttons = [];
        for (let i = 1; i <= 20; i++) {
            buttons.push(
                <Grid item xs={2} md={2} lg={2}>
                    <Button
                        className={classes.button}
                        key={i}
                        onClick={() => PostThrowCall(i.toString())}
                    >{i}</Button>
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

    const toggleDouble = () => {
        if (double)
            setDouble(false);
        else {
            setTripple(false);
            setDouble(true);
        }
    }

    const toggleTripple = () => {
        if (tripple)
            setTripple(false);
        else {
            setDouble(false);
            setTripple(true);
        }
    }

    return (
        <Wrap>

            {size < 499 ? (<Grid className={classes.wrap} container>
                {createButtons()}
                <Grid item xs={2} md={2} lg={2}>
                    <Button onClick={() => PostThrowCall('25')} className={classes.button}>25</Button>
                </Grid>
                <Grid item xs={2} md={2} lg={2}>
                    <Button onClick={() => toggleDouble()} className={double ? classes.buttonSelected: classes.button}>D</Button>
                </Grid>
                <Grid item xs={2} md={2} lg={2}>
                    <Button onClick={() => toggleTripple()} className={tripple ? classes.buttonSelected: classes.button}>T</Button>
                </Grid>
                <Grid item xs={2} md={2} lg={2}>
                    <Button className={classes.photo}><AddAPhotoIcon /></Button>
                </Grid>
            </Grid>) : (null)}

        </Wrap>





    );

};


export default AddThrow;