import Box from '@mui/system/Box';
import { useRef } from 'react';

import { SearchButtonToolbar } from 'src/components/search/toolbar/SearchButtonToolbar';
import { SearchProvider } from 'src/context/search/SearchProvider';
import { PlacesProvider } from 'src/context/places/PlacesProvider';
import { MapHandler } from 'src/components/map-handler/MapHandler';

export const MapPage = () => {
    const mapRef = useRef<L.Map>(null);

    return <PlacesProvider>
        <SearchProvider mapRef={mapRef}>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 1
                    }}
                >
                    <SearchButtonToolbar />
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 0
                    }}
                >
                    <MapHandler ref={mapRef} />
                </Box>
            </Box>
        </SearchProvider>
    </PlacesProvider>;
};