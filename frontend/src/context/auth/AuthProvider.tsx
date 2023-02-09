import { createContext, useState, PropsWithChildren, useEffect } from 'react';
import { BootstrapScreen } from 'src/screen/BootstrapScreen';
import { googleAuthApi, signInApi } from 'src/api/authentication/authentication.api';
import { bindAuthAxiosToken } from 'src/api/axios/authAxios';
import { LocalStorage } from 'src/utils/localStorage/LocalStorage';

interface AuthContextInterface {
    isSignedIn: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    googleAuth: (token: string) => Promise<void>;
    signOut: () => void;
}

export const AuthContext = createContext<AuthContextInterface>(null!);

export const AuthProvider = (props: PropsWithChildren<unknown>) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isBootstraping, setIsBootstraping] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setIsBootstraping(true);

        const accessToken = LocalStorage.getItem('accessToken');

        if(accessToken) {
            bindAuthAxiosToken(accessToken);
            setIsSignedIn(true);
        }

        setIsBootstraping(false);
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            const response = await signInApi(email, password);

            LocalStorage.setItem('accessToken', response.data.token);
            bindAuthAxiosToken(response.data.token);
            setIsSignedIn(true);
        }
        catch(error) {
            throw error;
        }
    };

    const googleAuth = async (token: string) => {
        try {
            const response = await googleAuthApi(token);

            LocalStorage.setItem('accessToken', response.data.token);
            bindAuthAxiosToken(response.data.token);
            setIsSignedIn(true);
        } catch(error) {
            throw error;
        }
    }

    const signOut = () => {
        LocalStorage.removeItem('accessToken');
        bindAuthAxiosToken('');
        setIsSignedIn(false);
    };

    return <AuthContext.Provider 
        value={{
            isSignedIn,
            signIn,
            googleAuth,
            signOut,
        }}
    >
        {isBootstraping ? <BootstrapScreen /> : props.children}
    </AuthContext.Provider>;
}