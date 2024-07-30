import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../index.css";
import { StyledEngineProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // default: true
            retry: 0,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </StyledEngineProvider>
    </React.StrictMode>
);
