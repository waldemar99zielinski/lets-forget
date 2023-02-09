import { PropsWithChildren, useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import { useAuth } from 'src/context/auth/useAuth';
import { getPath, Path } from 'src/router/routes';

export const AuthPagesRedirect = (props: PropsWithChildren) => {
    const navigate = useNavigate();
    const { isSignedIn } = useAuth();

    console.log("path:", getPath(Path.root));

    if(isSignedIn)
        return <Navigate to={getPath(Path.root)} />;

    return <>
        {props.children}
    </>;
}