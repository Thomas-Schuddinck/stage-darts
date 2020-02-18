import React, {Component} from 'react';
import Game from '../../components/Game/Game'
import Aux from '../../hoc/Wrap';

class GameBuilder extends Component {
    render () {
        return (
            <Aux>
                <Game/>
                <div>GameControls</div>
            </Aux>
        );
    }
}

export default GameBuilder;