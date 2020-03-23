import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import DartsBoardLogo from '../DartBoardLogo/DartBoardLogo';


const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  logo: {
    width: '25%',
    height: '25%',
    margin: '0 auto'
  },
  tekstHoofd: {
    alignSelf: 'center',
    color: "#004BFF",
    fontSize: '2em',

  },
}));
const DartsExplained = () => {

  const classes = useStyles();
  return (
    <div>
      <h1 className={classes.tekstHoofd}>Inleiding</h1>
      <div className={classes.logo}>

        <DartsBoardLogo />
      </div>
      <p>Darth fett ponda moff ackbar greedo kit calamari. Mace darth wicket jawa endor k-3po. Lars solo ben kessel. Ventress ben solo skywalker biggs. Mon solo yoda dantooine solo darth lars. Lars yoda antilles solo darth organa. Alderaan leia fett twi'lek. Lando chewbacca palpatine gonk hutt twi'lek watto ewok boba. Alderaan padmé fett darth jabba tusken raider solo. Darth antilles leia skywalker calrissian skywalker antilles c-3p0 obi-wan. C-3po fett boba gamorrean darth darth luuke ben. Maul wicket yoda biggs fett skywalker thrawn obi-wan.

      Darth r2-d2 watto solo solo darth skywalker dantooine ackbar. Jawa moff yoda coruscant organa windu anakin. Skywalker amidala thrawn leia darth. Sidious skywalker bespin obi-wan yavin mace. Mon chewbacca moff hutt hutt. Ewok sidious wicket boba. Solo greedo maul sebulba solo. Antilles alderaan ewok hutt skywalker darth skywalker hutt. Solo ponda twi'lek calamari mace leia kenobi. Darth c-3po greedo kit darth fisto. Coruscant windu watto endor calamari. Moff tusken raider jinn solo darth ventress darth obi-wan moff.

Cade antilles anakin jango. Mothma hutt darth wampa hutt fett. Moff yoda hutt bothan darth sidious chewbacca moff mon. Han organa mara boba naboo dooku mon. Jinn luke organa grievous organa. Droid c-3p0 fett mace wampa. Palpatine kenobi skywalker zabrak solo moff darth darth. Leia calrissian moff watto boba luke darth. Dagobah ponda ben boba dagobah moff kessel sith cade. Thrawn han binks dooku darth darth. Binks kit moff antilles palpatine skywalker kessel obi-wan. Jar antilles vader antilles wedge lando skywalker.</p>
    </div>
  )
}

export default DartsExplained;