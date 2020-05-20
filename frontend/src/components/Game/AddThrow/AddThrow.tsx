import React, { useState, useEffect } from 'react';
import { makeStyles, Grid, Button, Select, MenuItem, InputLabel, FormControl, Snackbar } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import Wrap from '../../../hoc/Wrap'
import { PostApiCall } from '../../../services/ApiClient';
import { GetApiCall } from '../../../services/ApiClient';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import GpsFixed from '@material-ui/icons/GpsFixed';
import ScoreIcon from '@material-ui/icons/Score';
import HistoryIcon from '@material-ui/icons/History';
import SendIcon from '@material-ui/icons/Send';
import { Environment } from '../../../environment'
import clsx from 'clsx';
import EjectIcon from '@material-ui/icons/Eject';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import Alert from '@material-ui/lab/Alert';
import { boolean } from 'yup';

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
        backgroundColor: '#DCDCDC',
        zIndex: 1101,
    },
    keyboardButton: {
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        zIndex: 1101,
        textAlign: 'center',
        marginBottom: '1.5em'
    },
    hidden: {
        visibility: 'hidden',
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
        display: 'block',
    },
    undo: {
        color: "#FFFFFF",
        border: '0.1em solid black',
        backgroundColor: 'red',
        width: '100%',
        display: 'block',
    },
    startstop: {
        color: "#FFFFFF",
        border: '0.1em solid black',
        backgroundColor: 'gray',
        width: '100%',
        display: 'block',
    },
    startstopNoPadding: {
        color: "#FFFFFF",
        border: '0.1em solid black',
        backgroundColor: 'gray',
        width: '100%',
        display: 'block',
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
        width: '100%',
        height: '100%!important',
        verticalAlign: 'bottom',
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    full_height: {
        height: '100%!important',
        '& > *': {
            height: '100%!important'
        }
    },
    formControl2: {
        margin: theme.spacing(1),
        width: '100%',
        height: '100%',
        verticalAlign: 'bottom',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    flexie: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    lijnZwart: {
        backgroundColor: 'black'
    },
    lijn: {
        textAlign: 'center',
    },
    paddy: {
        marginRight: '0.6em'
    },
    ll: {
        borderLeft: '0.1em solid black'
    },
    lineheight: {
        height: '5px'
    },
    darkButton: {
        backgroundColor: '#171717',
        border: '0.1em solid white',
        color: 'white',
        width: '100%',
        minWidth: '0',
        "&:hover": {
            backgroundColor: indigo[200],
        }
    },
    bigIcon: {
        fontSize: '3em',
        cursor: 'pointer',
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
    let [keyboardOpen = true, setKeyboardOpen] = useState<boolean>();
    let [raspberry = false, setRaspberry] = useState<boolean>();
    let [startstopButtonText = "start", setStartstopButtonText] = useState<string>();
    let [errormsg = "", setErrormsg] = useState<string>();
    let [showErrormsg = false, setShowErrormsg] = useState<boolean>();

    useEffect(() => {
        window.addEventListener('resize', updateWindowDimensions);
        setSize(window.innerWidth);
    }, []);

    const updateWindowDimensions = () => {
        setSize(window.innerWidth);
    }

    useEffect(() => {
        if (isNaN(area)) {
            setArea(0);
        }
    }, [area])

    useEffect(() => {
        async function evalScore() {
            let canSend = false;
            if (+area === 501) {
                setShowErrormsg(false);
                canSend = true;
            }
            if (+area === 25 || +area === 50) {
                if ((+area === 50 && multiplier < 2) || (+area === 25 && multiplier < 3)) {
                    setShowErrormsg(false);
                    canSend = true;
                } else {
                    setErrormsg("You can either set area to 25 with a maximum multiplier of 2 or 50 with a max multiplier of 1");
                    setShowErrormsg(true);
                }
            } else {
                if (+area < 0 || +area > 20) {
                    setErrormsg("If area is neither 25 or 50, the area must be between 0 and 20");
                    setShowErrormsg(true);
                } else {
                    setShowErrormsg(false);
                    canSend = true;
                }
            }
            if (canSend) {
                const newThrow = {
                    area: area,
                    multiplier: multiplier
                };
                setDouble(false);
                setTripple(false);
                return await PostApiCall(Environment.apiurl + '/Game/game', newThrow).then(() => {

                    setDoPost(false);
                    setArea(0);
                });
            }
            setDoPost(false);
            setArea(0);
        }
        if (doPost) {
            evalScore();
        }
    }, [doPost]);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        setShowErrormsg(false);
    };

    const createButtons = () => {
        let container = [];
        let buttons = [];
        for (let i = 1; i <= 20; i++) {
            buttons.push(
                <Grid item xs={2} md={2} lg={2} key={"grid-create-" + i}>
                    <Button
                        className={classes.button}
                        key={"button-" + i}
                        onClick={() => handleButtonClick(i)}
                    >{i}</Button>
                </Grid>
            )
        }
        container.push(
            <Wrap key={"wrap"}>
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

    const handleGoBack = () => {
        props.undoLastThrow();
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

    const keyboardClicked = () => {
        setKeyboardOpen(!keyboardOpen);
    }

    const doCall = (link: string) => {
        GetApiCall('http://' + link + '/stop').then(resp => {
        })
    }

    const startstop = async () => {
        if (raspberry) {
            setStartstopButtonText("start");
            setRaspberry(false);
            return await GetApiCall(Environment.apiurl + '/PiLink/').then(link => {
                doCall(link);
                return link;
            }).catch(function (error) {
                console.error(error);
            });
        } else {
            setStartstopButtonText("stop");
            setRaspberry(true);
            return await GetApiCall(Environment.apiurl + '/PiLink/').then(link => {
                GetApiCall('http://' + link + '/start').then(resp => {
                })
                return link;
            }).catch(function (error) {
                console.error(error);
            });
        }
    }

    return (
        <Wrap>
            {size < 499 ? (
                <Wrap>
                    <Snackbar open={showErrormsg} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">{errormsg}</Alert>
                    </Snackbar>
                    <div onClick={() => keyboardClicked()} className={keyboardOpen ? classes.hidden : classes.keyboardButton}>
                        <EjectIcon className={classes.bigIcon} key={"ej-button"} />
                    </div>
                    <Grid container className={keyboardOpen ? classes.wrap : classes.hidden}>
                        <Grid item xs={12} md={12} lg={12} className={classes.lijn} onClick={() => keyboardClicked()}>
                            <ArrowDropDown className={classes.bigIcon} />
                        </Grid>
                        {createButtons()}
                        <Grid item xs={2} md={2} lg={2}>
                            <Button onClick={() => handleButtonClick(25)} className={classes.button}>25</Button>
                        </Grid>
                        <Grid item xs={2} md={2} lg={2}>
                            <Button onClick={() => handleButtonClick(50)} className={classes.button}>50</Button>
                        </Grid>
                        <Grid item xs={2} md={2} lg={2}>
                            <Button onClick={() => toggleDouble()} className={double ? classes.buttonSelected : classes.darkButton}>D</Button>
                        </Grid>
                        <Grid item xs={2} md={2} lg={2}>
                            <Button onClick={() => toggleTripple()} className={tripple ? classes.buttonSelected : classes.darkButton}>T</Button>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} className={classes.lijn}>
                            <div className={classes.lineheight}></div>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Button className={clsx(classes.startstopNoPadding)} onClick={() => startstop()}><LiveTvIcon className={classes.paddy} />{startstopButtonText}</Button>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Button className={clsx(classes.undo)} onClick={() => handleGoBack()}><HistoryIcon className={classes.paddy} />Undo</Button>
                        </Grid>
                    </Grid>
                </Wrap>
            ) : (
                    <Grid container className={clsx(classes.controllers, classes.flexie)} spacing={1}>
                        <Grid item md={4} lg={4}>
                            <FormControl className={classes.formControl}>
                                <TextField

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
                            </FormControl>

                        </Grid>
                        <Grid item md={4} lg={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select--label">Multiplier</InputLabel>
                                <Select

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
                            </FormControl>

                        </Grid>
                        <Grid item md={4} lg={4}>
                            <FormControl className={classes.formControl2}>
                                <Button className={clsx(classes.send)} onClick={() => setDoPost(true)}>
                                    <SendIcon className={classes.paddy} />Add
                                </Button>
                            </FormControl>
                        </Grid>
                        <Grid item md={6} lg={6}>
                            <FormControl className={classes.formControl2}>
                                <Button className={clsx(classes.undo)} onClick={() => handleGoBack()}>
                                    <HistoryIcon className={classes.paddy} />Undo
                                </Button>
                            </FormControl>

                        </Grid>
                        <Grid item md={6} lg={6}>
                            <FormControl className={classes.formControl2}>
                                <Button className={clsx(classes.startstop)} onClick={() => startstop()}>
                                    <LiveTvIcon className={classes.paddy} />{startstopButtonText}
                                </Button>
                            </FormControl>

                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            {showErrormsg &&
                                <Alert severity="error">{errormsg}</Alert>
                            }
                        </Grid>
                    </Grid>
                )}
        </Wrap>
    );
};

export default AddThrow;