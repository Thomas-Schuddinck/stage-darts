import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Aux from '../../../hoc/Wrap';
import { Player } from "../../../models/Player";
import { PlayerDetail } from '../../../models/PlayerDetail';
import { PlayerLeg } from '../../../models/PlayerLeg';
import TurnComponent from '../Turn/Turn';
import PlayerLegComponent from '../PlayerLeg/PlayerLeg';
import { AppBar, Tabs, Tab, Grid } from '@material-ui/core';
import TabComponent from '../TabComponent/TabComponent';

const useStyles = makeStyles(theme => ({
    lijst: {
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    lijstchild: {
        margin: '0.25em 0'
    },


}));
function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function LegComponent(props: any) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Aux>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    {
                        props.leggroup.playerLegs.map(function (s: PlayerLeg, i: any) {
                            return <Tab label={s.player.name} {...a11yProps(i)} />
                        })
                    }

                </Tabs>
            </AppBar>
            
                {
                    props.leggroup.playerLegs.map(function (s: PlayerLeg, i: any) {
                        return <TabComponent value={value} index={i} ><PlayerLegComponent playerleg={s}/></TabComponent>
                    }
                    )}
        </Aux>
    )
};

export default LegComponent;