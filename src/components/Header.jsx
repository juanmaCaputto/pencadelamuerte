import { useMediaQuery } from "react-responsive";
import { Box, Toolbar, styled, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: 240,
        width: `calc(100% - ${240}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export function Header() {
    const isSmall = useMediaQuery({
        query: `(max-width: 650px)`,
    });

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar
                position="fixed"
                sx={{ backgroundColor: "#00E4FF" }}
                elevation={0}
            >
                <Toolbar>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        #LaPencaDeLaMuerte💀
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
