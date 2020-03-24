import React, { useEffect, useState } from "react";
import {
  Formik,
  Form
} from "formik";
import {
  Button
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
import GetApiCall from '../../services/ApiClient';


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
    .required()
    .max(10),
  
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

  const FetchData = async () => {

    setLoading(true);
    setPlayerList(await CallToApiPlayerListAll());
    setLoading(false);

  }

  useEffect(() => {
    FetchData();
  }, []);

  const CallToApiPlayerListAll = async (): Promise<Player[]> => {
    return await GetApiCall('https://localhost:5000/Player').then(pl => {
      return pl;

    });
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
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                // make async call
                console.log("submit: ", data);
                setSubmitting(false);
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
                    <RadioInput name="gameType" type="radio" value="1" label="casual" />
                    <RadioInput name="gameType" type="radio" value="2" label="competitive" />
                    <RadioInput name="gameType" type="radio" value="3" label="championship" />
                  </div>
                  <div>
                    <h5 className={classes.label}>Select Players</h5>
                    <Select
                      name="players"
                      multiple
                      value={playersInput}
                      onChange={handleChange}
                      
                      renderValue={(selected: any) => (
                        <div className={classes.chips}>
                          {selected.map((value: any) => (
                            
                            <Chip key={value} label={playerList!.find(p => {
                              return p!.id === value})!.name} className={classes.chip} />
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
          </div>
        )}
    </Wrap>
  );
};

export default NewGameBuilderForm;