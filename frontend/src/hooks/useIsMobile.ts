import useMediaQuery from '@mui/material/useMediaQuery';

const mobileScreenWidthPx = 420;

export const useIsMobile = () => {
    return useMediaQuery(`(max-width:${mobileScreenWidthPx}px)`);
};