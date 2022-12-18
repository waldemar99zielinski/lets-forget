import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthGuard } from 'src/context/guards/AuthGuard/useAuthGuard';
import { getPath, Path } from 'src/router/routes';

export const AuthProtectedRoute = (props: PropsWithChildren) => {
    const { isSignedIn } = useAuthGuard();

    if(!isSignedIn)
        return <Navigate to={getPath(Path.signIn)} replace />;

    return <>
        {props.children}
    </>;
}