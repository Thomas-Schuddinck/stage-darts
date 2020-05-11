import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Wrap from '../../hoc/Wrap'
import { TextField } from '@material-ui/core';
import { PostApiCall } from '../../services/ApiClient';
import { Environment } from '../../environment';

const useStyles = makeStyles(theme => ({
  code: {
    fontWeight: 'bold',
  }
}));

const InfoBuilder = () => {
  const classes = useStyles();
  let [value = "", setValue] = useState<string>();

  async function changeLink(link: string) {
    console.log(Environment.apiurl + '/PiLink');
    return await PostApiCall(Environment.apiurl + '/PiLink', link).then((resp) => {
      console.log(resp);
      return resp;
    });
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
      <p>Het script rasberryserverv2 heeft een paar belangrijke variables. Het middlepunt staat helemaal bovenaan. Dit is de x-coördinaat en het y-coördinaat van de pixel van het middlepunt. Dit kan gemakkelijk bepaald worden door bijvoorbeeld op 
        <a href="photopea.com" target="_blank" > photopea</a> (online photosop tool) een photo van het bord op te laden. Bij view => extras aan te zetten en rulers. Door op de ruler te klikken kan je deze verschuiven naar het midden en zal hij de x of y waarde zeggen. Deze allebei bepalen en in het script zetten.
        MIDDLEPOINT[x, y]. Om een foto van het bord te hebben kan je in het script in de methode -calculatePoint- onderaan de cv2.imwrite(frame) uit commentaar halen. Wanneer er een pijltje gesmeten wordt zal deze een foto wegschrijven (de foto die gebruikt wordt voor het berekenen van de punt). Laat dit niet
        voor altijd aan staan want wegschrijven naar sd kaart op de raspberry is niet performant.
      </p>

      <h2>Debuggen</h2>
      <p>Debuggen kan je zoals eerder vermeldt in de methode -calculatePoint- onderaan de methodes cv2.imwrite uit commentaar te halen. Wanneer het scriptje de punt probeert te bepalen zal hij zowel 
        de originele foto als het masker wegschrijven. Op die manier kan je proberen zien wat er juist fout loopt.
      </p>

      <h2>Indien camera upgrade</h2>
      <p>Vanboven in het script zijn er ook variables voorzien voor de resolutie van de camera. Momenteel staat deze op 640 * 480. Dit moet de waarde zijn van het originele beeld zonder scale toe te passen. Een gemakkelijke manier om de resolutie te verlagen indien deze van de nieuwe camera te hoog is 
        en de raspberry te traag werkt kan je doen door het scale percentage te verlagen. Om live te zien hoe snel de pi de beelden verwerkt kan je de methode cv2.imshow uit commentaar halen. Dit staat in de methode -start-.
      </p>

    </Wrap>

  );
}

export default InfoBuilder;


