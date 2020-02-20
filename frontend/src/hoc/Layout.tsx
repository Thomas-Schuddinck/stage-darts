import React from 'react';
import Aux from './Wrap';
import './Layout.css';
import MyToolbar from '../components/Navigation/Toolbar/MyToolbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      },
}));


export default function Layout (props: { children: React.ReactNode; }) {
    const classes = useStyles();

    return(
        <Aux>
        <MyToolbar>
        {props.children}
        </MyToolbar>        
    </Aux>
    )
    
    };