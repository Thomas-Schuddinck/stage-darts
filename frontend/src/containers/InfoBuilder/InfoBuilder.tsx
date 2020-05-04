import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Wrap from '../../hoc/Wrap'
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  code: {
    fontWeight: 'bold',
  }
}));

const InfoBuilder = () => {
  const classes = useStyles();
  let [value = "", setValue] = useState<string>();
  const changeLink = (link: string) => {
    console.log(value);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Wrap>
      <h1>Configure the RaspberryPi</h1>
      <h2>Run</h2>
      <p>Het kan zijn dat je het middelpunt enzoverder nog moet aanpassen (zie below). Eens alle variable goed staan kan je alles runnen als volgt:</p>
      <p className={classes.code}>sudo python3 rasberryserverv2.py</p>
      <p>Er is ook een tunnelverbinding nodig zodat je de raspberrypi kan aanspreken. Aangezien er enkel een start en stop call moet gebeuren kan dit via een free service ngrok:</p>
      <p className={classes.code}>./ngrok http 3000</p>
      <p>Beide commands runnen in de root van de pi (waar het script staat).</p>
      <p>De tunnelservice returned een link. Deze moet je hier setten. Alle slashes weglaten. Bijvoorbeeld http://3185df68.ngrok.io/ wordt dus 3185df68.ngrok.io Dit is nodig omdat we zonder body werken in de put call en de string dus geen slashes mag bevatten. TODO</p>
      <TextField
        placeholder="ngrok link"
        name="ngrok link"
        onChange={handleChange}
        onKeyPress={(ev) => {
          console.log(`Pressed keyCode ${ev.key}`);
          if (ev.key === 'Enter') {
            changeLink("");
            ev.preventDefault();
          }
        }}
      />

      <h2>Bord configureren</h2>
      <p>Het script rasberryserverv2 heeft een paar belangrijke variables. Middlepunt staat helemaal bovenaan. Dit is de x-coördinaat en het y-coördinaat van de pixel van het middlepunt.</p>

      <h2>Debuggen</h2>
      <p></p>

    </Wrap>

  );
}

export default InfoBuilder;


