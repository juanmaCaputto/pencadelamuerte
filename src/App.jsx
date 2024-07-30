import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ROUTES } from "./config/Routes";
import Dashboard from "./pages/Dashboard";
import { LoaderPage } from "./pages/loaders/LoaderPage";
import { Header } from "./components/Header";

export default function App() {
    return (
        <Suspense fallback={<LoaderPage />}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route
                        path={"/"}
                        element={<Navigate to={ROUTES.DASHBOARD} />}
                    />
                    <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                    <Route path="*" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}
