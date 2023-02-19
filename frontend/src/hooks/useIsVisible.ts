import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";

export type UseIsVisibleReturnType = [boolean, (node: HTMLElement) => void, MutableRefObject<HTMLElement | null>];

export const useIsVisible = (): UseIsVisibleReturnType => {
    const ref = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const observer = new IntersectionObserver(
        ([entry]) => {
            setIsVisible(entry.isIntersecting)
        }
    );

    const refCallback = useCallback((node: HTMLElement) => {
        if(node) {
            ref.current = node;
            observer.observe(node);
        }

    }, []);

    // useEffect(() => {
    //     return () => observer.disconnect();
    // }, []);

    return [isVisible, refCallback, ref];
}