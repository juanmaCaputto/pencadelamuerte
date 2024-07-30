import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";

import { getStandings } from "../../services/FootballAPI";

export default function CountryStandingsTable({ country, teams }) {
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
                teams.map((team) => team.value)
            )
        );
    }, [leagueStandings]);

    return (
        <TableBody>
            {country !== "" &&
                countryList.map((row) => (
                    <TableRow
                        key={row.name}
                        sx={{
                            "&:last-child td, &:last-child th": {
                                border: 0,
                            },
                        }}
                    >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.points}</TableCell>
                    </TableRow>
                ))}
        </TableBody>
    );
}
