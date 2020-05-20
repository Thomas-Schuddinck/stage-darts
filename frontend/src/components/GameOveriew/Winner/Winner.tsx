import React, { } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent} from '@material-ui/core';
import Card from "../../../styledcomponents/Card";
import CardAvatar from "../../../styledcomponents/CardAvatar";
import avatar from '../../../img/cup.jpg';
import Image from '../../../img/star_bg.jpg';

const useStyles = makeStyles(theme => ({
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