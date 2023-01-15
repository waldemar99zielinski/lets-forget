import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from 'src/context/auth/useAuth';
import { getPath, Path } from 'src/router/routes';

export const AuthProtectedRoute = (props: PropsWithChildren) => {
    const { isSignedIn } = useAuth();

    if(!isSignedIn)
        return <Navigate to={getPath(Path.signIn)} replace />;

    return <>
        {props.children}
    </>;
}