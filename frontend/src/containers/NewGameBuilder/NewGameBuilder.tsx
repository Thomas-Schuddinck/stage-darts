import React from "react";
import {
  Formik,
  Field,
  Form
} from "formik";
import {
  TextField,
  Button,
  Checkbox
} from "@material-ui/core";

import * as yup from "yup";
import TextInput from "../../components/NewGame/TextInput";
import RadioInput from "../../components/NewGame/RadioInput";


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
  return (
    <div>
      <Formik
        validateOnChange={true}
        initialValues={{
          gameName: "",
          gameType: "",
          players: [{ type: "player", name: "thomas", id: "" + Math.random() }]
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

            <TextInput placeholder="game name" name="gameName" />
            </div>
            <div>Game Type</div>
            <RadioInput name="gameType" type="radio" value="1" label="casual" />
            <RadioInput name="gameType" type="radio" value="2" label="competitive" />
            <RadioInput name="gameType" type="radio" value="3" label="championship" />
            
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