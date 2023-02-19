import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";

export type UseReturnType<T> = [(node: any) => void, MutableRefObject<T | null>];

export const useRefCallback = <T>(callback:(ref: MutableRefObject<T>) => void): UseReturnType<T> => {
    const ref = useRef<T | null>(null);

    const refCallback = useCallback((node: any) => {
        if(node) {
            ref.current = node;
            callback(ref as MutableRefObject<T>);
        }
    }, []);

    return [refCallback, ref];
}