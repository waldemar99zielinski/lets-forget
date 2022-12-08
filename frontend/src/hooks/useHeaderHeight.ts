import { useIsMobile } from "./useIsMobile";

export const headerHeightMobile = 56;
export const headerHeightDesktop = 64;

export const useHeaderHeight = () => {
    const isMobile = useIsMobile();

    return isMobile ? headerHeightMobile : headerHeightDesktop;
};