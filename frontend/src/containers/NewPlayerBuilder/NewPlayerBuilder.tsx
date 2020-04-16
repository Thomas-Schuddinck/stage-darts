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

import { GetApiCall } from '../../services/ApiClient';
import PropagateLoader from "react-spinners/PropagateLoader";
import { PlayerList } from "../../components/NewPlayer/PlayerList";
import { Player } from "../../models/Player";
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
    },
    but: {
        backgroundColor: '#004BFF',
        color: "#FFFFFF",
        padding: '1.2em 2em',
        margin: '0 auto',
        '&:hover': {
            backgroundColor: 'darkgreen',
         },
    },
    form: {
        padding: theme.spacing(1),
        display: 'flex',

        flexDirection: 'row',

    },
    input: {
        margin: '20px'
    },
    hr: {
        color: '#004BFF',
        borderColor: '#004BFF',
        borderWidth: '2px',
        margin: '1.5em 0',
        borderStyle: 'solid'
    },
    center: {
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'space-evenly', 
    }

}));



const validationSchema = yup.object({
    firstName: yup
        .string()
        .required("Your firstname is required")
        .max(20)
        .min(2),
    lastName: yup
        .string()
        .required("Your lastname is required")
        .max(20)
        .min(2),
    email: yup
        .string()
        .email("Must be a valid email")
        .required("Your email is required"),

});

const NewPlayerBuilderForm: React.FC = () => {
    const classes = useStyles();
    const theme = useTheme();



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
        return await GetApiCall(Environment.apiurl + '/Player').then(pl => {
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
                        await PostApiCall(Environment.apiurl + '/Player', newPlayer)
                        FetchData();
                        console.log("submit: ", data);
                        setSubmitting(false);
                    }}
                >
                    {({ values, errors, isSubmitting }) => (
                        <Form className={classes.center} >
                            <div className={classes.form}>
                                <div className={classes.input}>
                                    <h5 className={classes.label}>Set Firstname</h5>
                                    <TextInput placeholder="your firstname" name="firstName" />
                                </div>
                                <div className={classes.input}>
                                    <h5 className={classes.label}>Set Lastname</h5>
                                    <TextInput placeholder="your lastname" name="lastName" />
                                </div>
                                <div className={classes.input}>
                                    <h5 className={classes.label}>Set Email</h5>
                                    <TextInput placeholder="your email" name="email" />
                                </div>
                            </div>


                            <div className={classes.center} >
                                <Button disabled={isSubmitting} className={classes.but} type="submit">
                                    submit
                                </Button>
                            </div>
                            {/*<pre>{JSON.stringify(values, null, 2)}</pre>
                            <pre>{JSON.stringify(errors, null, 2)}</pre>*/}
                        </Form>
                    )}
                </Formik>
            </div>
            <hr className={classes.hr}/>
            {isLoading ? (
                <PropagateLoader
                    css={spinner}
                    size={20}
                    color={"#123abc"}
                />
            ) : (
                    <PlayerList players={playerList} />
                )}
        </Wrap>
    );
};

export default NewPlayerBuilderForm;