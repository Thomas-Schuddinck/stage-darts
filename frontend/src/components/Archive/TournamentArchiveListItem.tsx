import React, { } from 'react';
import Card from '../../styledcomponents/Card';
import CardHeader from '../../styledcomponents/CardHeader';
import GameListPlayerField from '../Lists/GameListPlayerField';
import { PlayerDetail } from '../../models/PlayerDetail';
import CardBody from '../../styledcomponents/CardBody';


const TournamentArchiveListItem = (props: any) => {

    return (
        <Card>
            <CardHeader color="info">
                <h4>{props.tournament.name}</h4>
            </CardHeader>
            <CardBody>
                <GameListPlayerField players={(props.tournament.players.map((p: PlayerDetail) => { return p.playerDTO }))} />
            </CardBody>
        </Card>
    );

};

export default TournamentArchiveListItem;