import React, { useEffect, useState } from "react";
import {
  Formik,
  Form,
  ErrorMessage
} from "formik";
import {
  Button, RadioGroup
} from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import * as yup from "yup";
import TextInput from "../../components/NewGame/TextInput";
import RadioInput from "../../components/NewGame/RadioInput";
import { Player } from "../../models/Player";
import { css } from "@emotion/core";
import PropagateLoader from "react-spinners/PropagateLoader";
import Wrap from '../../hoc/Wrap';
import { GetApiCall, PostApiCall } from '../../services/ApiClient';
import { AddGameDialog } from "../../components/NewGame/AddGameDialog";
import Alert from '@material-ui/lab/Alert';
import {Environment} from '../../environment';

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
    color: "#004BFF",
    fontSize: '1.2em',
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


function getStyles(id: number, playerList: any, theme: any) {
  return {
    fontWeight:
      playerList.indexOf(id) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const validationSchema = yup.object({
  gameName: yup
    .string()
    .required("A game name is required")
    .max(10),
  gameType: yup
  .number()
  .required("Select a game type"),
  players: yup
    .array()
    .required("You must add players to the game")
    .min(2, "You need at least 2 players")
    .when("gameType",{
      is: 3,
      then: yup.array().test('len', 'Must be a power of 2', val => PowerOf2?.includes(val.length))
    })

});

const NewGameBuilderForm: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const handleChange = (event: any) => {
    console.log('i changed');
    console.log(event.target.value);
    setPlayers(event.target.value);
  };

  let [playersInput, setPlayers] = React.useState([]);
  let [playerList, setPlayerList] = React.useState<Player[]>();
  let [isLoading, setLoading] = React.useState(true);
  let [openDialog, setOpenDialog] = React.useState(false);
  let [gameMode, setGameMode] = React.useState(-1);
  let [gameId = 0, setGameId] = React.useState<number>();

  const FetchData = async () => {

    setLoading(true);
    setPlayerList(await CallToApiPlayerListAll());
    setLoading(false);

  }

  useEffect(() => {
    FetchData();
  }, []);

  const CallToApiPlayerListAll = async (): Promise<Player[]> => {
    return await GetApiCall(Environment.apiurl + '/Player').then(pl => {
      return pl;

    });
  }

  const onRadioChange = (e: any) => {
    setGameMode(+e.target.value);

  }

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
          <div>
            <Formik
              validateOnChange={true}
              initialValues={{
                gameName: "",
                gameType: "",
                players: playersInput
              }}
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={async (data, { setSubmitting }) => {
                setSubmitting(true);
                const newGame = {
                  name: data.gameName,
                  type: data.gameType,
                  players: data.players,
                };
                const id = await PostApiCall(Environment.apiurl + '/Game/new-game', newGame)
                setGameId(id);
                setSubmitting(false);
                setOpenDialog(true);

              }}
            >
              {({ values, errors, isSubmitting }) => (
                <Form>
                  <div>
                    <h5 className={classes.label}>Set Game Name</h5>
                    
                    
                    <TextInput placeholder="game name" name="gameName" />
                  </div>
                  <div>
                    <h5 className={classes.label}>Select Game Type</h5>
                    <ErrorMessage component="div" name="gameType" />
                    {gameMode === 1 &&
                      <Alert severity="info">Play a casual game: this will not affect your statistics</Alert>
                    }
                    {gameMode === 2 &&
                      <Alert severity="error">Play a ranked game: this will affect your statistics and your rank</Alert>
                    }
                    {gameMode === 3 &&
                      <Alert severity="warning">Create a tournament consisting of multiple elimination rounds: this will affect player's statistics but not their rank</Alert>
                    }

                    <RadioGroup row onChange={onRadioChange} >
                      <RadioInput name="gameType" type="radio" value="1" label="casual" />
                      <RadioInput name="gameType" type="radio" value="2" label="competitive" />
                      <RadioInput name="gameType" type="radio" value="3" label="tournament" />
                    </RadioGroup>
                    

                  </div>
                  <div>
                    <h5 className={classes.label}>Select Players</h5>
                    <ErrorMessage component="div" name="players" />
                    
                    <Select
                      name="players"
                      multiple
                      value={playersInput}
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
                        <MenuItem key={player.id} value={player.id} style={getStyles(player.id, playersInput, theme)}>
                          {player.name}
                        </MenuItem>
                      ))}
                    </Select>

                  </div>

                  <div>
                    <Button disabled={isSubmitting} type="submit">
                      submit
              </Button>
                  </div>
                  <pre>{JSON.stringify(values, null, 2)}</pre>
                  <pre>{JSON.stringify(errors, null, 2)}</pre>
                </Form>
              )}
            </Formik>
            {openDialog ? (
              <AddGameDialog id={gameId}/>
            ) : (
                <div></div>
              )}

          </div>
        )}
    </Wrap>
  );
};

export default NewGameBuilderForm;