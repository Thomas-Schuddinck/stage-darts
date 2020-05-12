import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from 'react';
import { SideList } from '../SideBar/SideList';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    justifyContent: 'flex-start',
    [theme.breakpoints.up('sm')]: {

      justifyContent: 'flex-end',
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: "100%",
    width: "0%",
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    width: "100%",
    position: 'fixed',
    whiteSpace: 'nowrap',
    [theme.breakpoints.up('sm')]: {
      position: 'relative',
      width: drawerWidth,
      height: '100vh'
    },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    padding: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  test: {
    overflow: 'hidden',
  },
  fullSize:{
      paddingLeft: "10px",
      paddingRight: "10px"
  },
  bg: {
    background: 'linear-gradient(60deg,#10acf1, #1092f1)'
  }
}));

export default function MyToolbar(props: { children: React.ReactNode }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getClickFromSideList = async () => {
    if (window.innerWidth <= 650)
      handleDrawerClose();
  }

  return (
    <div className={clsx(classes.root, classes.test)}>
      <CssBaseline />
      <AppBar className={clsx(classes.appBar, open && classes.appBarShift, classes.bg)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            DaRts
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, classes.test, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={clsx(classes.toolbarIcon)}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <SideList sendClickToToolbar={getClickFromSideList} />
        </List>
      </Drawer>
      <main className={clsx(classes.content)}>
        <div className={clsx(classes.appBarSpacer)} />
        <Container maxWidth="lg" className={clsx(classes.container, classes.fullSize)}>
          {props.children}
        </Container>
      </main>
    </div>
  );
}
