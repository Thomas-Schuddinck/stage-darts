import React, { } from 'react';
import Card from '../../styledcomponents/Card';
import CardHeader from '../../styledcomponents/CardHeader';
import GameListPlayerField from '../Lists/GameListPlayerField';
import CardBody from '../../styledcomponents/CardBody';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    bg: {
        background: 'linear-gradient(60deg,#10acf1, #1092f1)!important' as any,
        color: 'white',
        '&:hover': {
            background: 'linear-gradient(60deg, #ab47bc, #8e24aa)!important' as any,
        }
    }
}));

const TournamentArchiveListItem = (props: any) => {
    const classes = useStyles();

    let history = useHistory();
    const navigateToTournament = (id: number) => {
        history.push(`/tournament/${id}`);
    }

    return (
        <div onClick={() => navigateToTournament(props.tournament.id)}>
            <Card>
                <CardHeader color="info" className={classes.bg}>
                    <h4>{props.tournament.name}</h4>
                </CardHeader>
                <CardBody>
                    <GameListPlayerField players={props.tournament.players} />
                </CardBody>
            </Card>
        </div>
    );
};

export default TournamentArchiveListItem;