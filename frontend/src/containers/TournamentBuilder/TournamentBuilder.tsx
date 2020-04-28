import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GetApiCall } from '../../services/ApiClient';
import { Environment } from '../../environment';
import { Tournament } from '../../models/Tournament';
import Wrap from '../../hoc/Wrap';
import CardHeader from "../../styledcomponents/CardHeader";
import CardBody from "../../styledcomponents/CardBody";
import Card from "../../styledcomponents/Card";

const useStyles = makeStyles(theme => ({
    cardje: {
        padding: "0",
        margin: "0",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: 'black',
            color: 'white',
        }
    },
}));

const TournamentBuilder = (props: { match: { params: any; }; }) => {

    const classes = useStyles();

    let [isLoading, setLoading] = React.useState(true);
    let [tournament, setTournament] = useState<Tournament>();
    let [players, setPlayers] = useState<string[]>();

    const CallToApiGame = async (id: number): Promise<Tournament> => {
        return await GetApiCall(Environment.apiurl + '/Tournament/' + id).then(tournament => {
            setPlayers(tournament.players);
            return tournament;
        });
    }

    const FetchData = async (id: number) => {
        setLoading(true);
        setTournament(await CallToApiGame(id));
        setLoading(false);

    }

    useEffect(() => {
        if (props.match.params.id) {
            FetchData(props.match.params.id);
        } else {
            FetchData(1);
        }
    }, []);

    const createRows = () => {
        let rows: JSX.Element[] = [];
        for (let rij = 1; rij < players!.length; rij++) {
            rows.push(
                <tr>{createColumns(rij)}</tr>
            );
        }
        return rows;
    }

    const createColumns = (rij: number) => {
        let columns: JSX.Element[] = [];
        for (let column = 1; column < Math.log2(players!.length) + 1; column++) {
            if ((rij - Math.pow(2, column - 1)) % Math.pow(2, column) == 0) {
                columns.push(
                    <Card className={classes.cardje}>
                        <CardBody>{tournament!.players.length == 2 ? "wouter vs glenn" : "to be determined"}</CardBody>
                    </Card>
                );
            } else {
                columns.push(
                    <td><Card></Card></td>
                );
            }
        }

        return columns;
    }

    return (
        <Wrap>
            {isLoading ? (
                <p>loading</p>
            ) : (
                    <Wrap>
                        <h1>tournament</h1>
                        <table aria-label="customized table">
                            {createRows()}
                        </table></Wrap>
                )}
        </Wrap>

    );

}

export default TournamentBuilder;


