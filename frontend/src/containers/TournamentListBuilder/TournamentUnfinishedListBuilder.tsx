import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { GetApiCall } from '../../services/ApiClient';
import PropagateLoader from "react-spinners/PropagateLoader";
import Wrap from '../../hoc/Wrap';
import { css } from "@emotion/core";
import { NavLink, Redirect } from 'react-router-dom';
import { Environment } from '../../environment'
import { useHistory } from "react-router-dom";
import { indigo } from '@material-ui/core/colors';
import { Tournament } from '../../models/SimpleTournament';
import GameListPlayerField from '../../components/Lists/GameListPlayerField';

const StyledTableCell = withStyles(theme => ({
    head: {
        [theme.breakpoints.up('sm')]: {
            padding: '16px',
        },
        padding: '15px',
    },
    body: {
        [theme.breakpoints.up('sm')]: {
            fontSize: 14,
            padding: 16,
        },
        padding: 15,
        fontSize: 12,
    },
    table: {
        minWidth: 0,
        [theme.breakpoints.up('sm')]: {
            minWidth: 450,
        },
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    onhover: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: indigo[50],
        },
    },
    
    bg: {
        background: 'linear-gradient(60deg,#10acf1, #1092f1)',
        '& > *': { color: 'white' }

    },
});

export const TournamentUnfinishedListBuilder = () => {
    const classes = useStyles();

    let [tournamentList, setTournamentList] = useState<Tournament[]>();
    let [isLoading, setLoading] = React.useState(true);

    const FetchData = async () => {

        setLoading(true);

        setTournamentList(await CallToApiTournamentListAll());
        setLoading(false);

    }

    useEffect(() => {
        FetchData();
    }, []);

    const CallToApiTournamentListAll = async (): Promise<Tournament[]> => {
        return await GetApiCall(Environment.apiurl + '/unfinished').then(tournamentList => {
            return tournamentList;
        });
    }
    const forDate = (dt: string) => {
        let date = new Date(Date.parse(dt));
        return date.toLocaleDateString();
    }
    const renderRedirect = (tournament: Tournament) => {

        if (tournament) {
            const id = tournament.id;
            return <Redirect to={`/Tournament/:id`} />
        }
    }

    let history = useHistory();
    const navigateToTournament = (id: number) => {
        console.log(id);
        history.push(`/Tournament/${id}`);
    }


    const createTable = () => {
        let table: JSX.Element[] = [];

        tournamentList!.forEach((tournament: Tournament, i: any) => {
            table.push(
                //onClick = {() => renderRedirect(game)} key={i} 

                <StyledTableRow className={classes.onhover} onClick={() => navigateToTournament(tournament.id)}>

                    {/* <StyledTableCell align="center">{game!.legGroups!.length}</StyledTableCell> */}
                    <StyledTableCell align="center">{tournament.name} Tournament</StyledTableCell>
                    <StyledTableCell align="center"><GameListPlayerField players={tournament.players} ></GameListPlayerField></StyledTableCell>
                </StyledTableRow>


            )
        });
        return table;
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
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow className={classes.bg}>
                                    {/* <StyledTableCell align="center">Current Leg</StyledTableCell> */}
                                    <StyledTableCell align="center">Name</StyledTableCell>
                                    <StyledTableCell align="center">Players</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {createTable()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
        </Wrap>

    );
}

export default TournamentUnfinishedListBuilder;
