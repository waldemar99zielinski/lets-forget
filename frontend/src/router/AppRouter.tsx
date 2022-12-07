import { Routes, Route, Navigate } from "react-router-dom";
import { DefaultPageLayout } from "src/layouts/DefaultPageLayout";

import { getPath, Path } from "./routes";

import { MapPage } from "src/pages/MapPage";
import { OfferPage } from "src/pages/OfferPage";
import { ProfilePage } from "src/pages/ProfilePage";
import { RootPage } from "src/pages/RootPage";

export const AppRouter = () => {
    return <Routes>
        <Route path={getPath(Path.root)} element={<DefaultPageLayout />}>
            <Route index element={<RootPage />} />
            <Route path={getPath(Path.map)} element={<MapPage />} />
            <Route path={getPath(Path.offer)} element={<OfferPage />} />
            <Route path={getPath(Path.profile)} element={<ProfilePage />} />
        </Route>
        <Route path='*' element={<Navigate to={getPath(Path.root)} />} />
    </Routes>;
};