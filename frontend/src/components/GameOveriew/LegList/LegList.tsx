import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Aux from '../../../hoc/Wrap';
import { LegGroup } from '../../../models/LegGroup';
import { LegButtonComponent } from './LegButton';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    lijst: {
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'row',
    },
    lijstchild: {
        margin: '0.25em 0',
        [theme.breakpoints.up('sm')]: {
            width: '50%'
        },
        [theme.breakpoints.up('md')]: {
            width: '33%'
        }
    },
}));

function LegListComponent(props: any) {
    const classes = useStyles();
    const [current, setCurrent] = React.useState(-1);

    const getIdFromChild = async (id: number) => {
        setCurrent(id);
        await props.sendIdToBuilder(id);
    }

    return (
        <Aux>
            <div className={clsx(classes.lijst, "flex-row", "justify-content-start")} >
                {
                    props.leggroups.map(function (s: LegGroup, i: any) {
                        return <LegButtonComponent legnr={i + 1} id={i} current={current} sendIdToParent={getIdFromChild} className={classes.lijstchild} />
                    }
                    )}
            </div>
        </Aux>
    )
};

export default LegListComponent;