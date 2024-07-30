export async function getStandings({ league = 39 }) {
    const url = `https://api-football-v1.p.rapidapi.com/v3/standings?league=${league}&season=2023`;
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key":
                "a2e6cbbc25mshb00375362e9b59cp19ed24jsned64dc18df1b",
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        },
    };

    try {
        if (league == "") {
            return {};
        }
        const response = await fetch(url, options);
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function getPlayerStats({ player = 1100, league = 39 }) {
    const url = `https://api-football-v1.p.rapidapi.com/v3/players?id=${player}&league=${league}&season=2023`;
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key":
                "a2e6cbbc25mshb00375362e9b59cp19ed24jsned64dc18df1b",
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        },
    };

    try {
        const response = await fetch(url, options);
        return response.json();
    } catch (error) {
        console.error(error);
    }
}
