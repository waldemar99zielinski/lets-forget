import { useRef } from 'react';

import { config } from 'src/config';
import { useAuth } from 'src/context/auth/useAuth';
import { useLoadScript } from 'src/hooks/useLoadScript';
import { Path, getPath } from 'src/router/routes';

export const GoogleAuthButton = () => {
    const buttonRef = useRef(null);
    const {googleAuth} = useAuth();

    const onSignIn = async (response: any) => {
        console.log('on sign in response:', response);

        await googleAuth(response.credential);

        window.location.replace(getPath(Path.root));
    };

    useLoadScript({
        src: 'https://accounts.google.com/gsi/client',
        async: true,
        defer: true
    }, () => {
        //@ts-ignore
        window.google.accounts.id.initialize({
            client_id: config.auth.googleClientId,
            callback: onSignIn,
            auto_select: false,
        });

        //@ts-ignore
        window.google.accounts.id.renderButton(buttonRef.current, {
            size: 'large',
            width: '500px'
        });
    });

    return <div ref={buttonRef} />;
};