import { Typography, Box, makeStyles } from "@material-ui/core";
import React from "react";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }
  
  const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
      },

}));
export default function TabComponent(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        className={classes.root}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={1}>{children}</Box>}
      </Typography>
    );
  }