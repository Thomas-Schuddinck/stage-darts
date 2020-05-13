import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import TabComponent from '../../components/Game/TabComponent/TabComponent';
import { Tournament } from '../../models/SimpleTournament';
import { GetApiCall } from '../../services/ApiClient';
import { Environment } from '../../environment';
import { Game } from '../../models/Game';
import GameArchiveList from '../../components/Archive/GameArchiveList';
import TournamentArchiveList from '../../components/Archive/TournamentArchiveList';
import Aux from '../../hoc/Wrap';
import { css } from "@emotion/core";
import PropagateLoader from "react-spinners/PropagateLoader";
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    bg: {
        background: 'linear-gradient(60deg,#10acf1, #1092f1)'
    },
    placeholdr: {
        textAlign: 'center',
        padding: '1em',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#e7f7fe',
        }
    }
}));

function anyProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const ArchiveBuilder = (props: any) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    let [tournamentList, setTournamentList] = useState<Tournament[]>();
    let [gameList, setGameList] = useState<Game[]>();
    let [isLoading, setLoading] = React.useState(true);

    const FetchData = async () => {
        setLoading(true);
        setTournamentList(await CallToApiTournamentListAll());
        setGameList(await CallToApiGameListAll());
        setLoading(false);
    }

    useEffect(() => {
        FetchData();
    }, []);

    const CallToApiTournamentListAll = async (): Promise<Tournament[]> => {
        return await GetApiCall(Environment.apiurl + '/finished').then(tournamentList => {
            return tournamentList;
        });
    }

    const CallToApiGameListAll = async (): Promise<Game[]> => {
        return await GetApiCall(Environment.apiurl + '/gamelist/finishedNT').then(gameList => {
            return gameList;
        });
    }

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const spinner = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    margin-left: 50%;
  `;

    let history = useHistory();
    const navigateTonNewGame = () => {
        history.push(`/new-game/`);
    }

    return (
        <Aux>
            {isLoading ? (
                <PropagateLoader
                    css={spinner}
                    size={20}
                    color={"#123abc"}
                />
            ) : (
                    <Aux>
                        <AppBar className={classes.bg} position="static">
                            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="fullWidth">
                                <Tab label="NORMAL GAMES" {...anyProps(0)} />
                                <Tab label="TOURNAMENTS" {...anyProps(1)} />
                            </Tabs>
                        </AppBar>
                        <TabComponent value={value} index={0} >
                            <GameArchiveList gameList={gameList} />
                            {gameList!.length === 0 ? (<Typography onClick={() => navigateTonNewGame()} className={classes.placeholdr}>No games played yet, click here to create and start your first game!</Typography>) : (null)}
                        </TabComponent>
                        <TabComponent value={value} index={1} >
                            <TournamentArchiveList tournamentList={tournamentList} />
                            {tournamentList!.length === 0 ? (<Typography onClick={() => navigateTonNewGame()} className={classes.placeholdr}>No tournaments played yet, click here to create and start your first game!</Typography>) : (null)}
                        </TabComponent>
                    </Aux>
                )}
        </Aux>
    );
}

export default ArchiveBuilder;


