import React, { useEffect, useState } from "react";
import {
    Formik,
    Form
} from "formik";
import {
    Button
} from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as yup from "yup";
import TextInput from "../../components/NewGame/TextInput";
import { css } from "@emotion/core";
import Wrap from '../../hoc/Wrap';
import { PostApiCall } from '../../services/ApiClient';

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



const validationSchema = yup.object({
    firstName: yup
        .string()
        .required()
        .max(10),
    lastName: yup
        .string()
        .required()
        .max(10),
    email: yup
        .string()
        .email()
        .required(),

});

const NewPlayerBuilderForm: React.FC = () => {
    const classes = useStyles();
    const theme = useTheme();



    const spinner = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-left: 50%;
`;

    return (
        <Wrap>
            <div>
                <Formik
                    validateOnChange={true}
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: ""
                    }}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={async (data, { setSubmitting }) => {
                        setSubmitting(true);
                        const newPlayer = {
                            firstname: data.firstName,
                            lastname: data.lastName,
                            email: data.email,
                        };
                        console.log(data);
                        console.log(newPlayer);
                        await PostApiCall('https://localhost:5000/Player', newPlayer)

                        console.log("submit: ", data);
                        setSubmitting(false);
                    }}
                >
                    {({ values, errors, isSubmitting }) => (
                        <Form>
                            <div>
                                <h5 className={classes.label}>Set Firstname</h5>
                                <TextInput placeholder="your firstname" name="firstName" />
                            </div>
                            <div>
                                <h5 className={classes.label}>Set Lastname</h5>
                                <TextInput placeholder="your lastname" name="lastName" />
                            </div>
                            <div>
                                <h5 className={classes.label}>Set Email</h5>
                                <TextInput placeholder="your email" name="email" />
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
        </Wrap>
    );
};

export default NewPlayerBuilderForm;