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
const useStyles = makeStyles(theme => ({

    bg: {
        background: 'linear-gradient(60deg,#10acf1, #1092f1)'
    }


}));
function anyProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
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
                            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                <Tab label="NORMAL GAMES" {...anyProps(0)} />
                                <Tab label="TOURNAMENTS" {...anyProps(1)} />
                            </Tabs>
                        </AppBar>
                        <TabComponent value={value} index={0} ><GameArchiveList gameList={gameList} /></TabComponent>
                        <TabComponent value={value} index={1} ><TournamentArchiveList tournamentList={tournamentList} /></TabComponent>
                    </Aux>
                )}
        </Aux>

    );
}

export default ArchiveBuilder;


