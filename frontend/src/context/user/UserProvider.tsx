import { createContext, useState, PropsWithChildren, useEffect } from 'react';
import { useAuth } from 'src/context/auth/useAuth';
import { getUserMe } from 'src/api/user/user.api';
import { ChangeUsernameDialog } from 'src/components/user/ChangeUsernameDialog';
import { SelectDefaultCityDialog } from 'src/components/user/SelectDefaultCityDialog';

interface UserContextInterface {
    user: User | null;
    isLoading: boolean;
    updateUser: (updatedUser: Partial<User>) => void;
    setIsSelectDefaultCityDialogOpen: (isOpen: boolean) => void;
}

export const UserContext = createContext<UserContextInterface>(null!);

export const UserProvider = (props: PropsWithChildren<unknown>) => {
    const {isSignedIn} = useAuth();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isChangeUsernameDialogOpen, setIsChangeUsernameDialogOpen] = useState(false);
    const [isSelectDefaultCityDialogOpen, setIsSelectDefaultCityDialogOpen] = useState(false);

    useEffect(() => {
        if(!isSignedIn)
            return;
        (async () => {
            setIsLoading(true);

            const fetchedUser = await getUserMe();

            setUser(fetchedUser);

            setIsLoading(false);
        })();
    }, [isSignedIn]);

    useEffect(() => {
        if(user && user.id === user.username)
            setIsChangeUsernameDialogOpen(true);
        
        if(user && !user.defaultCity)
            setIsSelectDefaultCityDialogOpen(true);
    }, [user]);

    const updateUser = (updatedUser: Partial<User>) => {
        setUser((currentUser) => {
            if(!currentUser)
                return null;

            return {...currentUser, ...updatedUser};
        })
    }

    return <UserContext.Provider
        value={{
            user,
            isLoading,
            updateUser,
            setIsSelectDefaultCityDialogOpen
        }}
    >
        {props.children}
        <ChangeUsernameDialog 
            open={isChangeUsernameDialogOpen}
            onClose={() => setIsChangeUsernameDialogOpen(false)}
        />
        <SelectDefaultCityDialog
            open={isSelectDefaultCityDialogOpen}
            onClose={() => setIsSelectDefaultCityDialogOpen(false)}
        />
    </UserContext.Provider>;
}