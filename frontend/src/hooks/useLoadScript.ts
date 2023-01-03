import { useEffect } from 'react';

export const useLoadScript = (props: Partial<HTMLScriptElement>, callback?: () => void) => {
    useEffect(() => {
        const script = document.createElement('script');

        script.async = true;
        script.defer = true;
        
        for(const key in props) {
            (script as any)[key] = props[key as keyof HTMLScriptElement]
        }

        if(callback)
            script.onload = callback;

        document.body.appendChild(script);

        return () => void document.body.removeChild(script);
    }, [props, callback]);
}