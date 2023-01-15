import { createContext, useState, PropsWithChildren, useEffect } from 'react';
import { useAuth } from 'src/context/auth/useAuth';
import { getUserMe } from 'src/api/user/user.api';
import { ChangeUsernameDialog } from 'src/components/user/ChangeUsernameDialog';

interface UserContextInterface {
    user: User | null;
    updateUser: (updatedUser: Partial<User>) => void;
}

export const UserContext = createContext<UserContextInterface>(null!);

export const UserProvider = (props: PropsWithChildren<unknown>) => {
    const {isSignedIn} = useAuth();
    const [user, setUser] = useState<User | null>(null);
    const [isChangeUsernameDialogOpen, setIsChangeUsernameDialogOpen] = useState(false);

    useEffect(() => {
        if(!isSignedIn)
            return;

        getUserMe()
            .then((fetch_user) => setUser(fetch_user));
    }, [isSignedIn]);

    useEffect(() => {
        if(user && user.id === user.username)
            setIsChangeUsernameDialogOpen(true);
    }, [user]);

    const updateUser = (updatedUser: Partial<User>) => {
        setUser((currentUser) => {
            if(!currentUser)
                return null;

            return {...currentUser, ...updatedUser}
        })
    }

    return <UserContext.Provider
        value={{
            user,
            updateUser
        }}
    >
        {props.children}
        <ChangeUsernameDialog 
            open={isChangeUsernameDialogOpen}
            onClose={() => setIsChangeUsernameDialogOpen(false)}
        />
    </UserContext.Provider>;
}