import { createContext, PropsWithChildren, useState } from 'react';

interface GlobalContextInterface {
    isSearchDialogOpened: boolean;
    setIsSearchDialogOpened: (isOpened: boolean) => void;
}

export const GlobalContext = createContext<GlobalContextInterface>(null!);

export const GlobalContextProvider = (props: PropsWithChildren<unknown>) => {
    const [isSearchDialogOpened, setIsSearchDialogOpened] = useState(false);

    return <GlobalContext.Provider value={{
        isSearchDialogOpened,
        setIsSearchDialogOpened
    }}>
        {props.children}
    </GlobalContext.Provider>
}