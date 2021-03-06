import React, { } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Player } from '../../models/Player';
import Card from "../../styledcomponents/Card";
import CardAvatar from "../../styledcomponents/CardAvatar";
import avatar from '../../img/avatarGradient.png';

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
    autoC: {
        color: "purple",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0d84d9"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0d84d9"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0d84d9"
    }
    }
}));

const PersonStat = (props: any) => {
    const classes = useStyles();

    const onTagChange = (event: any, value: any) => {
        props.parentGivePlayer(value);
    }

    return (
        <Card profile>
            <CardAvatar profile>
                <img src={avatar} alt="..." />
            </CardAvatar>
            <CardContent>
                <Autocomplete
                    classes={{
                        root: classes.autoC,
                    }}
                    className={classes.wide}
                    id="combo-box-demo"
                    disableClearable
                    options={props.players}
                    getOptionLabel={(option: Player) => option.name!}
                    onChange={(e: any, v: any) => onTagChange(e, v)}
                    renderInput={params => <TextField {...params} label="Player" variant="outlined"
                    />}
                />
            </CardContent>
        </Card>
    );
};

export default PersonStat;