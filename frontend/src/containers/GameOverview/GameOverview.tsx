import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect } from 'react';
import Aux from '../../hoc/Wrap';
import LegListComponent from '../../components/GameOveriew/LegList/LegList';
import { GetApiCall } from '../../services/ApiClient';
import { Environment } from '../../environment';
import { css } from "@emotion/core";
import PropagateLoader from "react-spinners/PropagateLoader";
import LegComponent from '../../components/Game/Leg/Leg';
import Winner from '../../components/GameOveriew/Winner/Winner';
import { GameOverview } from '../../models/GameOverview';
import LegOverview from '../../components/GameOveriew/LegOverview/LegOverview';
import CardHeader from "../../styledcomponents/CardHeader";
import CardBody from "../../styledcomponents/CardBody";
import Card from "../../styledcomponents/Card";

export const GameOverviewBuilder = (props: { match: { params: any; }; }) => {

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
                    color={"#0d84d9"}
                />
            ) : (
                    <Grid container spacing={3}>
                        <Grid item lg={6} xs={12} md={6}>
                            <Winner player={overview!.winner} />
                        </Grid>
                        {/* Performance */}
                        <Grid item xs={12} md={6} lg={6}>
                            <LegOverview legwinners={overview!.legWinners} />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Card>
                                <CardHeader color="info">
                                    <h4>Leg Details</h4>
                                </CardHeader>
                                <CardBody>
                                    <Grid item lg={12} xs={12} md={12}>
                                        <LegListComponent leggroups={overview!.game!.legGroups!} sendIdToBuilder={getSelectedIdFromList} />
                                    </Grid>
                                    <div>
                                        {selectedLegId >= 0 ? (
                                            <LegComponent leggroup={overview!.game!.legGroups![selectedLegId]} />
                                        ) : (
                                                <div></div>
                                            )}
                                    </div>
                                </CardBody>
                            </Card>
                        </Grid>
                    </Grid>
                )}
        </Aux>
    );
}