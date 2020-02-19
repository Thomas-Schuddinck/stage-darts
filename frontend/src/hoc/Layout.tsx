import React from 'react';
import Aux from './Wrap';
import './Layout.css';
import Toolbar from '../components/Navigation/Toolbar/MyToolbar';

const layout = (props: { children: React.ReactNode; }) => (
    <Aux>
        <Toolbar/>
        <main className='Content'>
            {props.children}
        </main>
    </Aux>
);

export default layout;