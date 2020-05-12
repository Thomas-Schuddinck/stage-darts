import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GetApiCall } from '../../services/ApiClient';
import { Environment } from '../../environment';
import { Tournament } from '../../models/Tournament';
import Wrap from '../../hoc/Wrap';
import Card from "../../styledcomponents/Card";
import { Game } from '../../models/Game';
import TournamentGame from './tournamentComponents/tournamentGame';
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/core";

const useStyles = makeStyles(theme => ({
    tabel: {
        width: '100%',
    },
}));

const TournamentBuilder = (props: { match: { params: any; }; }) => {
    const classes = useStyles();

    const spinner = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    margin-left: 50%;
  `;

    let [isLoading, setLoading] = React.useState(true);
    let [tournament, setTournament] = useState<Tournament>();
    let [players, setPlayers] = useState<string[]>();
    let [games, setGames] = useState<Record<number, Game[]>>({});
    let [stageTeller, setStageTeller] = useState<Record<number, number>>({});

    const CallToApiGame = async (id: number): Promise<Tournament> => {
        return await GetApiCall(Environment.apiurl + '/Tournament/' + id).then(tournament => {
            setPlayers(tournament.players);
            tournament.games.forEach((g: Game) => {
                if(!games![g.bracketStageNumber]) {
                    games![g.bracketStageNumber] = [];
                }
                games![g.bracketStageNumber].push(g);
            });
            for(let key in games) {
                games[key].sort((game1: Game, game2: Game) => {
                    return game1.bracketSectorNumber < game2.bracketSectorNumber ? -1 : 1;
                });
            }
            for(let i = 1; i < Math.log2(tournament.players.length) + 1; i++) {
                stageTeller[i] = 0;
            }
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
            if ((rij - Math.pow(2, column - 1)) % Math.pow(2, column) === 0) {
                var game = games[column][stageTeller[column]];
                columns.push(
                    <TournamentGame propsgame={game} />
                );
                stageTeller[column] = stageTeller[column] + 1;
                console.log(stageTeller);
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
                <PropagateLoader
                css={spinner}
                size={20}
                color={"#123abc"}
            />
            ) : (
                    <Wrap>
                        <h1>{tournament!.name.toUpperCase()}</h1>
                        <table aria-label="customized table" className={classes.tabel}>
                            {createRows()}
                        </table></Wrap>
                )}
        </Wrap>

    );

}

export default TournamentBuilder;


