import React, { } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { CardContent, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Card from "../../../styledcomponents/Card";
import CardAvatar from "../../../styledcomponents/CardAvatar";

import avatar from '../../../img/cup.jpg';
import Image from '../../../img/star_bg.jpg';
const useStyles = makeStyles(theme => ({
    tekstHoofd: {
        alignSelf: 'center',
        color: "#004BFF",
        fontSize: '2em',
        borderBottomColor: '#004BFF',
        borderBottomWidth: 3,
        borderBottomStyle: "solid"
    },
    wide: {
        width: '100%'
    },
    height: {
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundPosition: "center center"
    },
    wit:{
        color: 'white'
    }

}));

const Winner = (props: any) => {
    const classes = useStyles();

    return (
        <Card profile className={classes.height}>
            <CardAvatar profile>
                <img src={avatar} alt="..." />
            </CardAvatar>
            <CardContent >
                <h1 className={classes.wit}>{props.player}</h1>
            </CardContent>
                        
                
          
        </Card>
    );

};

export default Winner;