import { TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

import { getPlayerStats } from "../../services/FootballAPI";

export default function PlayerRow({ country, playerOriginal }) {
    const [player, setPlayer] = useState();

    const getStandingsAndPlayersGoals = async () => {
        if (country !== "") {
            await getPlayerStats({
                league: country,
                player: playerOriginal.value,
            }).then((res) => {
                setPlayer(res.response[0]);
            });
        }
    };

    useEffect(() => {
        getStandingsAndPlayersGoals();
    }, [country, playerOriginal]);

    return (
        <TableRow
            sx={{
                "&:last-child td, &:last-child th": {
                    border: 0,
                },
            }}
        >
            <TableCell component="th" scope="row">
                {player?.player.name}
            </TableCell>
            <TableCell align="right">
                {player?.statistics[0].goals.total}
            </TableCell>
        </TableRow>
    );
}
