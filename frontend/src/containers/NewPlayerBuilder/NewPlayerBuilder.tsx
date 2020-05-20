import React, { useEffect} from "react";
import {
    Formik,
    Form
} from "formik";
import {
    Button, Grid, CardContent
} from "@material-ui/core";
import { makeStyles} from '@material-ui/core/styles';
import * as yup from "yup";
import TextInput from "../../components/NewGame/TextInput";
import { css } from "@emotion/core";
import Wrap from '../../hoc/Wrap';
import { PostApiCall } from '../../services/ApiClient';
import { GetApiCall } from '../../services/ApiClient';
import PropagateLoader from "react-spinners/PropagateLoader";
import { PlayerList } from "../../components/NewPlayer/PlayerList";
import { Player } from "../../models/Player";
import { Environment } from '../../environment';
import { indigo } from '@material-ui/core/colors';
import Card from "../../styledcomponents/Card";
import CardAvatar from "../../styledcomponents/CardAvatar";

import avatar from '../../img/avatarGradient.png';
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
    },
    but: {
        background: 'linear-gradient(60deg,#10acf1, #1092f1)',
        color: "#FFFFFF",
        padding: '1.2em 2em',
        margin: '1em',
        '&:hover': {
            backgroundColor: indigo[200],
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
        borderColor: '#1092f1',
        borderWidth: '2px',
        margin: '1.5em 0',
        borderStyle: 'solid'
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    bg: {
        background: 'linear-gradient(60deg,#10acf1, #1092f1)'

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
            <Card profile>
            <CardAvatar profile>
                <img src={avatar} alt="..." />
            </CardAvatar>
            <CardContent>
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
                            <Grid container>
                                <Grid item xs={12} md={3} lg={3} className={classes.center}>
                                    <div className={classes.input}>
                                        <h5 className={classes.label}>Firstname</h5>
                                        <TextInput placeholder="your firstname" name="firstName" />
                                    </div>
                                    </Grid>
                                    <Grid item xs={12} md={3} lg={3} className={classes.center}>
                                    <div className={classes.input}>
                                        <h5 className={classes.label}>Lastname</h5>
                                        <TextInput placeholder="your lastname" name="lastName" />
                                    </div>
                                    </Grid>
                                    <Grid item xs={12} md={3} lg={3} className={classes.center}>
                                    <div className={classes.input}>
                                        <h5 className={classes.label}>Email</h5>
                                        <TextInput placeholder="your email" name="email" />
                                    </div>
                                    </Grid>
                                    <Grid item xs={12} md={3} lg={3} className={classes.center}>
                                <div className={classes.center} >
                                    <Button disabled={isSubmitting} className={classes.but} type="submit">
                                        Add
                                </Button>
                                </div>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
                </CardContent>
            </Card>
            <hr className={classes.hr} />
            {isLoading ? (
                <PropagateLoader
                    css={spinner}
                    size={20}
                    color={"#0d84d9"}
                />
            ) : (
                    <PlayerList players={playerList} />
                )}
        </Wrap>
    );
};

export default NewPlayerBuilderForm;