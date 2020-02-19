import React, {Component} from 'react';
import Person from '../../components/PersonalStats/Person'
import Aux from '../../hoc/Wrap';

class PersonalStatsBuilder extends Component {
    render () {
        return (
            <Aux>
                <Person/>
                <div>Heatmap?</div>
            </Aux>
        );
    }
}

export default PersonalStatsBuilder;