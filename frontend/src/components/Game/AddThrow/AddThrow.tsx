import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, Grid, Button, Select, MenuItem } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import Wrap from '../../../hoc/Wrap'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { PostApiCall } from '../../../services/ApiClient';
import { PutApiCall } from '../../../services/ApiClient';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import GpsFixed from '@material-ui/icons/GpsFixed';
import ScoreIcon from '@material-ui/icons/Score';
import SendIcon from '@material-ui/icons/Send';
import { Environment } from '../../../environment'
import clsx from 'clsx';


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
        right: '0',
        backgroundColor: 'black',
        // paddingLeft: '2em',
        // paddingRight: '2em',
        // backgroundClip: 'content-box'
    },
    photo: {
        color: "#FFFFFF",
        backgroundColor: '#C4151C',
        width: '100%',
        minWidth: '0',
        border: '0.1em solid black',
    },
    send: {
        color: "#FFFFFF",
        backgroundColor: 'green',
        border: '0.1em solid black',
    },
    buttonSelected: {
        color: 'black',
        backgroundColor: indigo[200],
        width: '100%',
        minWidth: '0',
        border: '0.1em solid black',
    },
    controllers: {
        padding: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        width: '30%',
        minWidth: '0',
        verticalAlign: 'bottom'
    },
    flexie: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bringForeground: {
        zIndex: 1101,
    },
    lijn: {
        backgroundColor:'green'
    },
    paddy:  {
        marginRight: '0.6em'
    }
}));

const AddThrow = (props: any) => {
    const classes = useStyles();

    let [area = 0, setArea] = useState<number>();
    let [size = 0, setSize] = useState<number>();
    let [tripple = false, setTripple] = useState<boolean>();
    let [double = false, setDouble] = useState<boolean>();
    let [multiplier = 1, setMultiplier] = useState<number>();
    let [doPost = false, setDoPost] = useState<boolean>();

    useEffect(() => {
        window.addEventListener('resize', updateWindowDimensions);
        setSize(window.innerWidth);
    }, []);

    

    const updateWindowDimensions = () => {
        setSize(window.innerWidth);
    }

    useEffect(() =>{
        if(isNaN(area)){
            setArea(0);
        }
    }, [area])

    useEffect(() => {
        async function PostThrowCall() {
            const newThrow = {
                area: area,
                multiplier: multiplier
            };

            setDouble(false);
            setTripple(false);
            if (props.selectedThrow == null) {
                return await PostApiCall(Environment.apiurl + '/Game/game', newThrow).then(() => {
                    setDoPost(false);
                    setArea(0);
                });
            } else {
                /*
                return await PutApiCall(Environment.apiurl + '/Game/throwedit/' + props.currentgame + '/' + props.selectedThrow.id + '/' + val).then(resp => {
                    console.log("--------");
                    console.log(props.selectedThrow);
                    console.log(props.currentgame);
                    console.log(resp);
                });
                */
            }
        }
        if(doPost){
            PostThrowCall();
        }
    }, [doPost]);





    const createButtons = () => {
        let container = [];
        let buttons = [];
        for (let i = 1; i <= 20; i++) {
            buttons.push(
                <Grid item xs={3} md={3} lg={3}>
                    <Button
                        className={classes.button}
                        key={i}
                        onClick={() => handleButtonClick(i)}
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
        if (double) {
            setDouble(false);
            handleMultiChange(1);
        } else {
            setTripple(false);
            setDouble(true);
            handleMultiChange(2);
        }
    }
    const handleMultiChange = (i: number) => {
        setMultiplier(i);
    };

    const handleButtonClick = (i: number) => {

        setArea(i);
        setDoPost(true);
    };


    const toggleTripple = () => {
        if (tripple) {
            setTripple(false);
            handleMultiChange(1);
        } else {
            setDouble(false);
            setTripple(true);
            handleMultiChange(3);
        }
    }

    return (
        <Wrap>

            {size < 499 ? (
                <Grid container className={clsx(classes.wrap, classes.bringForeground)}>
                    {createButtons()}
                    <Grid item xs={12} md={12} lg={12} className={classes.lijn}>
                        <hr/>
                    </Grid>
                    <Grid item xs={3} md={3} lg={3}>
                        <Button onClick={() => handleButtonClick(25)} className={classes.button}>25</Button>
                    </Grid>
                    <Grid item xs={3} md={3} lg={3}>
                        <Button onClick={() => handleButtonClick(50)} className={classes.button}>50</Button>
                    </Grid>
                    <Grid item xs={3} md={3} lg={3}>
                        <Button onClick={() => toggleDouble()} className={double ? classes.buttonSelected : classes.button}>D</Button>
                    </Grid>
                    <Grid item xs={3} md={3} lg={3}>
                        <Button onClick={() => toggleTripple()} className={tripple ? classes.buttonSelected : classes.button}>T</Button>
                    </Grid>
                    
                </Grid>
            ) : (
                    <Grid container className={clsx(classes.controllers, classes.flexie)} spacing={1}>

                        <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                className={classes.formControl}
                                id="input-with-icon-textfield"
                                label="Area"
                                onKeyPress={(ev) => {
                                    console.log(`Pressed keyCode ${ev.key}`);
                                    if (ev.key === 'Enter') {

                                        
                                        setDoPost(true);
                                        ev.preventDefault();
                                    }
                                }}
                                value={area}
                                onChange={(e) => { setArea(parseInt(e.target.value)) }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <GpsFixed />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Select
                                className={classes.formControl}
                                id="multiplier-select"
                                label="Multiplier"
                                value={multiplier}
                                onChange={(e) => { handleMultiChange(parseInt(e.target.value as string)) }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <ScoreIcon />
                                    </InputAdornment>
                                }

                            >
                                <MenuItem value={1} selected>Single</MenuItem>
                                <MenuItem value={2}>Double</MenuItem>
                                <MenuItem value={3}>Triple</MenuItem>
                            </Select>
                            <Button className={clsx(classes.send, classes.formControl)} onClick={() => setDoPost(true)}><SendIcon className={classes.paddy} />Add Throw</Button>
                        </Grid>
                    </Grid>
                )}

        </Wrap>





    );

};


export default AddThrow;