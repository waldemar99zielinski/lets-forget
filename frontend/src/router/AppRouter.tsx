import { Routes, Route, Navigate } from 'react-router-dom';

import { DefaultPageLayout } from 'src/layouts/DefaultPageLayout';
import { MobileViewPageLayout } from 'src/layouts/MobileViewPageLayout';
import { FullPageLayout } from 'src/layouts/FullPageLayout';

import { MapPage } from 'src/pages/MapPage';
import { OfferPage } from 'src/pages/OfferPage';
import { ProfilePage } from 'src/pages/ProfilePage';
import { RootPage } from 'src/pages/RootPage';

import { MobileUserMenuPage } from 'src/pages/MobileUserMenuPage';

import { SignInPage } from 'src/pages/authorization/SignInPage';
import { SignUpPage } from 'src/pages/authorization/SignUpPage';
import { SingOutPage } from 'src/pages/authorization/SignOutPage';
import { EmailActivationPage } from 'src/pages/authorization/EmailActivationPage';

import { getPath, Path } from './routes';
import { AuthProtectedRoute } from './protected-routes/AuthProtectedRoute';
import { AuthPagesRedirect } from './protected-routes/AuthPagesRedirect';
import { WorkspaceProvider } from 'src/pages/providers/WorkspaceProvider';

export const AppRouter = () => {
    return <Routes>
        <Route path={getPath(Path.root)} element={<WorkspaceProvider><DefaultPageLayout /></WorkspaceProvider>}>
            <Route index element={<RootPage />} />
            <Route path={getPath(Path.map)} element={<MapPage />} />
            <Route path={getPath(Path.offer, '/:id')} element={<OfferPage />} />
            <Route path={getPath(Path.profile)} element={<AuthProtectedRoute><ProfilePage /></AuthProtectedRoute>} />
        </Route>
        <Route path={getPath(Path.mobileView)} element={<MobileViewPageLayout />}>
            <Route index element={<Navigate to={getPath(Path.root)} />} />
            <Route path={getPath(Path.mobileUserMenu)} element={<MobileUserMenuPage />} />
        </Route>
            <Route path={getPath(Path.auth)} element={<AuthPagesRedirect><FullPageLayout /></AuthPagesRedirect>}>
                <Route index element={<Navigate to={getPath(Path.signIn)} />} />
                <Route path={getPath(Path.signIn)} element={<SignInPage />} />
                <Route path={getPath(Path.signUp)} element={<SignUpPage />} />
                <Route path={getPath(Path.signOut)} element={<SingOutPage />} />
                <Route path={getPath(Path.activate)} element={<EmailActivationPage />} />
            </Route>
            <Route path='*' element={<Navigate to={getPath(Path.root)} />} />
    </Routes>;
};