import { useEffect } from 'react';

interface Props extends HTMLLinkElement {
    href: HTMLLinkElement['href']
}

export const useLoadLink = (props: Partial<HTMLLinkElement>, callback?: () => void) => {
    useEffect(() => {
        const link = document.createElement('link');

        for(const key in props) {
            (link as any)[key] = props[key as keyof HTMLLinkElement]
        }

        if(callback)
            link.onload = callback

        document.head.appendChild(link);

        return () => void document.head.removeChild(link);
    }, [props, callback]);
}