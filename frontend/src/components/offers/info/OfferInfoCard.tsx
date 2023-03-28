import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import SettingsOverscanIcon from '@mui/icons-material/SettingsOverscan';

import { getOfferTypeProps } from 'src/components/offers/common/getOfferTypeProps';
import { Map } from 'src/components/map/Map';
import { beerMarkerProps } from 'src/components/map-handler/customMarkers';
import { useRefCallback } from 'src/hooks/useRefCallback';
import { Toolbar } from 'src/components/toolbar/Toolbar';

import { OfferAvailability } from './OfferAvailability';

interface OfferInfoCardProps {
    offer: Offer;
}

interface ContainerProps {
    background: string;
}

const Container = styled(Paper)<ContainerProps>`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;
    justify-content: center;
    padding: 1rem;
    border-radius: 0.3rem;
    background-image: ${props => `url(${props.background})`};
    background-size: cover;
    background-repeat: no-repeat;
`;

export const OfferInfoCard = (props: OfferInfoCardProps) => {
    const {offer} = props;
    const [mapRef] = useRefCallback<L.Map>((ref) => {
        ref.current.dragging.disable();
        ref.current.zoomControl.remove();
        ref.current.touchZoom.disable();
        ref.current.boxZoom.disable();
        ref.current.doubleClickZoom.disable();
        ref.current.scrollWheelZoom.disable();
    });
    
    const offerProps = getOfferTypeProps(offer.typeId);

    return <Container background={offerProps.backgroundBig}>
        <Typography variant='h5' align='center'>
            {offer.title}
        </Typography>
        <Typography variant='h6' align='center'>
            {offer.place.name}
        </Typography>
        <Typography 
            align='center'
            sx={{
                fontSize: '0.9rem'
            }}
        >
            {offer.description}
        </Typography>
        <Typography 
            align='center'
            variant='h4'
        >
            {`${offer.price} ${offer.currency}`}
        </Typography>
        <OfferAvailability
            startsAt={offer.startsAt}
            endsAt={offer.endsAt}
            schedules={offer.schedules}
        />
        <Box sx={{
            width: '100%',
            minWidth: '100px',
            height: '450px',
            minHeight: '100px',
        }}>
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
                    <Toolbar 
                        items={[
                            {
                                icon: <SettingsOverscanIcon />

                            }
                        ]}
                    />
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
                    <Map
                        center={[offer.place.latitude, offer.place.longitude]}
                        markers={[beerMarkerProps({
                            latitude: offer.place.latitude,
                            longitude: offer.place.longitude
                        })]}
                        zoom={16}
                        ref={mapRef}
                    />
                </Box>
            </Box>
        </Box>
    </Container>;
}