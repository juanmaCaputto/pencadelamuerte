import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { TEAMS_AND_PLAYERS } from "../util/TeamsAndPlayers";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStandings } from "../services/FootballAPI";
import PlayerRow from "../components/dashboard/PlayerRow";
import CountryStandingsTable from "../components/dashboard/CountryStandingsTable";

export default function Dashboard() {
    const [country, setCountry] = useState("");
    const [countryList, setCountryList] = useState([]);

    const { data: leagueStandings } = useQuery({
        queryKey: ["Standings", country],
        queryFn: () => getStandings({ league: country }),
    });

    function filterTeamsByIds(standings, teamIds) {
        return standings
            .filter((team) => teamIds.includes(team.team.id))
            .map((team) => ({
                id: team.team.id,
                name: team.team.name,
                points: team.points,
            }));
    }

    useEffect(() => {
        setCountryList(
            filterTeamsByIds(
                leagueStandings?.response &&
                    leagueStandings?.response[0]?.league?.standings
                    ? leagueStandings?.response[0]?.league?.standings[0]
                    : [],
                TEAMS_AND_PLAYERS[0].teams.map((team) => team.value)
            )
        );
    }, [leagueStandings]);

    return (
        <Grid container spacing={3} sx={{ py: 10, px: 5 }}>
            <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                    <InputLabel>País</InputLabel>
                    <Select
                        value={country}
                        label="País"
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        {TEAMS_AND_PLAYERS.map((item) => (
                            <MenuItem
                                key={item.country.value}
                                value={item.country.value}
                            >
                                {item.country.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={8} />
            <Grid item xs={12} md={6}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Equipo</TableCell>
                                <TableCell align="right">Puntos</TableCell>
                            </TableRow>
                        </TableHead>
                        <CountryStandingsTable
                            country={country}
                            teams={TEAMS_AND_PLAYERS[0].teams}
                        />
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12} md={6}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Goleador</TableCell>
                                <TableCell align="right">Goles</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {country !== "" &&
                                TEAMS_AND_PLAYERS[0].players.map((row, i) => (
                                    <PlayerRow
                                        key={i}
                                        country={country}
                                        playerOriginal={row}
                                    />
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}
