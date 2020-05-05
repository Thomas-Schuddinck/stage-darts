import React, { } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Card from '../../styledcomponents/Card';
import CardHeader from '../../styledcomponents/CardHeader';

import CardBody from "../../styledcomponents/CardBody";
import GameListPlayerField from '../Lists/GameListPlayerField';
import { PlayerDetail } from '../../models/PlayerDetail';
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
    wit: {
        color: 'white'
    }

}));

const GameArchiveListItem = (props: any) => {
    const classes = useStyles();

    const forDate = (dt: string) => {
        let date = new Date(Date.parse(dt));
        return date.toLocaleDateString();
    }

    console.log(props.game);
    return (
        <Card>
            <CardHeader color="primary">
                <div>
                    <h4>{props.game.name}</h4>
                    <h5>{forDate(props.game.beginDate)}</h5>
                </div>
            </CardHeader>
            <CardBody>
                <GameListPlayerField players={props.game.players.map((p: PlayerDetail) => { return p.playerDTO })} />
            </CardBody>
        </Card>
    );

};

export default GameArchiveListItem;