import React, { } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Card from '../../styledcomponents/Card';
import CardHeader from '../../styledcomponents/CardHeader';

import CardBody from "../../styledcomponents/CardBody";
import GameListPlayerField from '../Lists/GameListPlayerField';
import { PlayerDetail } from '../../models/PlayerDetail';
const useStyles = makeStyles(theme => ({
    
    bg: {
        background: 'linear-gradient(60deg,#10acf1, #1092f1)!important' as any,
        color: 'white', 
        '&:hover':{
            background: 'linear-gradient(60deg, #ab47bc, #8e24aa)!important' as any,
        }
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
            <CardHeader color="info" className={classes.bg}>
                <div>
                    <h3>{props.game.name}</h3>
                    <h3>{forDate(props.game.beginDate)}</h3>
                </div>
            </CardHeader>
            <CardBody>
                <GameListPlayerField players={props.game.players.map((p: PlayerDetail) => { return p.playerDTO })} />
            </CardBody>
        </Card>
    );

};

export default GameArchiveListItem;