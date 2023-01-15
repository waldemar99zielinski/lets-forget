import { createContext, useState, PropsWithChildren, useEffect } from 'react';
import { BootstrapScreen } from 'src/screen/BootstrapScreen';
import { signInApi } from 'src/api/authentication/authentication.api';
import { bindAuthAxiosToken } from 'src/api/axios/authAxios';

interface AuthContextInterface {
    isSignedIn: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
}

export const AuthContext = createContext<AuthContextInterface>(null!);

export const AuthProvider = (props: PropsWithChildren<unknown>) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isBootstraping, setIsBootstraping] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setIsBootstraping(true);

        const accessToken = window.localStorage.getItem('lft');

        if(accessToken) {
            bindAuthAxiosToken(accessToken);
            setIsSignedIn(true);
        }

        setIsBootstraping(false);
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            const response = await signInApi(email, password);

            window.localStorage.setItem('lft', response.data.token);
            bindAuthAxiosToken(response.data.token);
            setIsSignedIn(true);
        }
        catch(error) {
            throw error;
        }
    };

    const signOut = () => {
        window.localStorage.removeItem('lft');
        bindAuthAxiosToken('');
        setIsSignedIn(false);
    };

    return <AuthContext.Provider 
        value={{
            isSignedIn,
            signIn,
            signOut,
        }}
    >
        {isBootstraping ? <BootstrapScreen /> : props.children}
    </AuthContext.Provider>;
}