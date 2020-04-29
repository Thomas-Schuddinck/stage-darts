import Grid from '@material-ui/core/Grid';

import React, { useState, useEffect } from 'react';
import Aux from '../../hoc/Wrap';
import LegListComponent from '../../components/GameOveriew/LegList/LegList';
import { GameDetails } from '../../models/GameDetails';
import { GetApiCall } from '../../services/ApiClient';
import * as signalR from "@aspnet/signalr";
import { Environment } from '../../environment';
import { Status } from '../../models/Status';
import { css } from "@emotion/core";
import PropagateLoader from "react-spinners/PropagateLoader";
import LegComponent from '../../components/Game/Leg/Leg';
import Winner from '../../components/GameOveriew/Winner/Winner';
import { GameOverview } from '../../models/GameOverview';
import LegOverview from '../../components/GameOveriew/LegOverview/LegOverview';
/*
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));
*/



export const GameOverviewBuilder = (props: { match: { params: any; }; }) => {

    console.log("test eens dit");
    console.log(props.match.params.id);
    let [overview, setOverview] = useState<GameOverview>();
    let [isLoading, setLoading] = React.useState(true);
    const FetchData = async (id: number) => {
        setLoading(true);
        setOverview(await CallToApiGame(id));
        setLoading(false);


    }

    useEffect(() => {

        if (props.match.params.id) {
            FetchData(props.match.params.id);
        } else {
            FetchData(1);
        }
    }, []);

    const CallToApiGame = async (id: number): Promise<GameOverview> => {
        return await GetApiCall(Environment.apiurl + '/Game/overview/' + id).then(gameDetails => {
            console.log("dit is de game");
            console.log(gameDetails)
            return gameDetails;
        });
    }

    const spinner = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    margin-left: 50%;
  `;

    let [selectedLegId, setSelectedLegId] = useState(-1);
    const getSelectedIdFromList = async (id: number) => {
        setSelectedLegId(id);
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
                    <Grid container spacing={3}>
                        <Grid item lg={6} xs={12} md={6}>
                            <Winner player={overview!.winner}/>
                        </Grid>
                        {/* Performance */}
                        <Grid item xs={12} md={6} lg={6}>
                            <LegOverview legwinners={overview!.legWinners} />
                        </Grid>
                        <Grid item lg={12} xs={12} md={12}>
                            <LegListComponent leggroups={overview!.game!.legGroups!} sendIdToBuilder={getSelectedIdFromList} />
                        </Grid>

                        <Grid item xs={12} md={12} lg={12}>
                            {selectedLegId >= 0 ? (
                                <LegComponent leggroup={overview!.game!.legGroups![selectedLegId]} />
                            ) : (
                                    <div></div>
                                )}
                        </Grid>
                        
                    </Grid>
                )}

        </Aux>
    );
}