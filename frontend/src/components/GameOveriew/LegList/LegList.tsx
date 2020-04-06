import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Aux from '../../../hoc/Wrap';
import { LegGroup } from '../../../models/LegGroup';
import { LegButtonComponent } from './LegButton';

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

function LegListComponent(props: any) {
    const classes = useStyles();
    const [current, setCurrent] = React.useState(-1);
    
    const getIdFromChild = async (id: number) => {
        props.sendThrowToBuilder(id);
        setCurrent(id)

      }
    return (
        <Aux>

            {
                props.leggroups.map(function (s: LegGroup, i: any) {
                    return <LegButtonComponent legnr={i + 1} index={i} current={current} sendIdToParent={getIdFromChild}/>
                }
                )}
            <hr />
        </Aux>
    )
};

export default LegListComponent;


