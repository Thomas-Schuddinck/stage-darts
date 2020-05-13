import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Aux from '../../../hoc/Wrap';
import { PlayerLeg } from '../../../models/PlayerLeg';
import PlayerLegComponent from '../PlayerLeg/PlayerLeg';
import { AppBar, Tabs, Tab } from '@material-ui/core';
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
    bg: {
        background: 'linear-gradient(60deg,#10acf1, #1092f1)'
    }
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
            <AppBar className={classes.bg} position="static">
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
                    return <TabComponent value={value} index={i} ><PlayerLegComponent klein={props.klein} playerleg={s} /></TabComponent>
                }
                )}
        </Aux>
    )
};

export default LegComponent;