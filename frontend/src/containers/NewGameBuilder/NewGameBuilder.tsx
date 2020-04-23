import React, { useEffect, useState } from "react";
import {
  Button, RadioGroup, Grid, TextField, FormControl, FormLabel, FormControlLabel, Radio
} from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { Player } from "../../models/Player";
import { css } from "@emotion/core";
import PropagateLoader from "react-spinners/PropagateLoader";
import Wrap from '../../hoc/Wrap';
import { GetApiCall, PostApiCall } from '../../services/ApiClient';
import { AddGameDialog } from "../../components/NewGame/AddGameDialog";
import Alert from '@material-ui/lab/Alert';
import { Environment } from '../../environment';
import SendIcon from '@material-ui/icons/Send';

import clsx from 'clsx';
import RadioInput from "../../components/NewGame/RadioInput";

import Card from "../../styledcomponents/Card";
import CardAvatar from "../../styledcomponents/CardAvatar";

import avatar from '../../img/play7.png';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  label: {
    alignSelf: 'center',
    color: "#2e5871",
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
  send: {
    color: "#FFFFFF",
    backgroundColor: '#2e5871',
    border: '0.1em solid black',
  },

  flexie: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  controllers: {
    padding: theme.spacing(1),
  },
  paddy: {
    marginRight: '0.6em'
  },
  fullwidth: {
    width: "100%"
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const PowerOf2 = [2, 4, 8, 16, 32, 64, 128, 256]


function getStyles(id: number, playerList: number[], theme: any) {
  return {
    fontWeight:
      playerList.indexOf(id) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const NewGameBuilderForm: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  let [players, setPlayers] = React.useState<number[]>([]);
  let [playerList, setPlayerList] = React.useState<Player[]>();
  let [isLoading, setLoading] = React.useState(true);
  let [isSubmitting, setSubmitting] = React.useState(false);
  let [openDialog, setOpenDialog] = React.useState(false);
  let [gameMode, setGameMode] = React.useState<string>();
  let [gameId = 0, setGameId] = React.useState<number>();
  let [isLoadingData, setIsLoadingData] = React.useState(false);
  let [name, setName] = React.useState<string>();
  let [doPost = false, setDoPost] = useState<boolean>();


  const FetchData = async () => {

    setLoading(true);
    setPlayerList(await CallToApiPlayerListAll());
    setLoading(false);

  };

  useEffect(() => {
    FetchData();
  }, []);

  const CallToApiPlayerListAll = async (): Promise<Player[]> => {
    return await GetApiCall(Environment.apiurl + '/Player').then(pl => {
      return pl;

    });
  };

  useEffect(() => {
    async function PostThrowCall() {
      const newGame = {
        name: name,
        type: gameMode,
        players: players,
      };
      setSubmitting(true);
      let id;
      if(gameMode !== "3"){
        id = await PostApiCall(Environment.apiurl + '/Game/new-game', newGame)
      }else{
        id = await PostApiCall(Environment.apiurl + '/Tournament/new-tournament', newGame)
      }
        
        
      setGameId(id);
      setSubmitting(false);
      setOpenDialog(true);

    }
    if (doPost) {
      PostThrowCall();
    }
  }, [doPost]);



  const handleChange = (event: any) => {
    console.log(players);
    setIsLoadingData(true);
    console.log(event.target.value);
    setPlayers(event.target.value);
  };

  const onRadioChange = (e: any) => {
    setIsLoadingData(true);
    setGameMode(e.target.value);

  }
  const onNameChange = (e: any) => {
    setIsLoadingData(true);
    setName(e.target.value);

  }

  useEffect(() => {
    setIsLoadingData(false);
    console.log(players);

  }, [players, gameMode, name])

  const spinner = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-left: 50%;
`;

  return (
    <Wrap>
      {isLoading ? (
        <PropagateLoader
          css={spinner}
          size={20}
          color={"#123abc"}
        />
      ) : (
          <Card profile>
            <CardAvatar profile>
              <img src={avatar} alt="..." />
            </CardAvatar>
            <Grid container className={clsx(classes.controllers, classes.flexie)} spacing={1}>
              <Grid item xs={12} md={12} lg={12}>
                {gameMode === "1" &&
                  <Alert severity="info">Play a casual game: this will not affect your statistics</Alert>
                }
                {gameMode === "2" &&
                  <Alert severity="error">Play a ranked game: this will affect your statistics and your rank</Alert>
                }
                {gameMode === "3" &&
                  <Alert severity="warning">Create a tournament consisting of multiple elimination rounds: this will affect player's statistics but not their rank</Alert>
                }
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <FormControl component="fieldset" className={classes.fullwidth}>
                  <FormLabel component="legend" className={classes.label}>Select Game Type</FormLabel>
                  <RadioGroup aria-label="gameType" name="gameType" value={gameMode} onChange={onRadioChange}>
                    <FormControlLabel value="1" control={<Radio />} label="Casual" />
                    <FormControlLabel value="2" control={<Radio />} label="Competitive" />
                    <FormControlLabel value="3" control={<Radio />} label="Tournament" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} lg={3} >
                <FormControl component="fieldset" className={classes.fullwidth}>
                  <FormLabel component="legend" className={classes.label}>Set Game Name</FormLabel>
                  <TextField
                    className={classes.formControl}
                    id="input-with-icon-textfield"
                    label="name"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} lg={3} >
                <FormControl component="fieldset" className={classes.fullwidth}>
                  <FormLabel component="legend" className={classes.label}>Select Players</FormLabel>
                  <Select
                    name="players"
                    multiple
                    value={players}
                    onChange={handleChange}

                    renderValue={(selected: any) => (
                      <div className={classes.chips}>
                        {selected.map((value: any) => (

                          <Chip key={value} label={playerList!.find(p => {
                            return p!.id === value
                          })!.name} className={classes.chip} />
                        ))}
                      </div>
                    )}
                    className={classes.formControl}
                    MenuProps={MenuProps}
                  >
                    {playerList?.map(player => (
                      <MenuItem key={player.id} value={player.id} style={getStyles(player.id, players!, theme)}>
                        {player.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Button className={clsx(classes.send, classes.formControl)} onClick={() => setDoPost(true)}><SendIcon className={classes.paddy} />Add Game</Button>
              </Grid>

              {openDialog ? (
                <AddGameDialog id={gameId} />
              ) : (
                  <div></div>
                )}
            </Grid>
          </Card>

        )
      }
    </Wrap >
  );
};

export default NewGameBuilderForm;