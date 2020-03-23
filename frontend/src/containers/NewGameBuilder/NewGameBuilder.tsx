import React from "react";
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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name: any, personName: any, theme: any) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const validationSchema = yup.object({
  firstName: yup
    .string()
    .required()
    .max(10),
  pets: yup.array().of(
    yup.object({
      name: yup.string().required()
    })
  )
});

const NewGameBuilderForm: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [player, setPlayer] = React.useState([]);

  const handleChange = (event: any) => {
    setPlayer(event.target.value);
  };
  return (
    <div>
      <Formik
        validateOnChange={true}
        initialValues={{
          gameName: "",
          gameType: "",
          players: []
        }}
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
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                name="players"
                value={player}
                onChange={handleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected: any) => (
                  <div className={classes.chips}>
                    {selected.map((value: any) => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
                className={classes.formControl}
                MenuProps={MenuProps}
              >
                {names.map(name => (
                  <MenuItem key={name} value={name} style={getStyles(name, player, theme)}>
                    {name}
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
  );
};

export default NewGameBuilderForm;