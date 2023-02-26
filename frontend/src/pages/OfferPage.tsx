import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import { Navigate, useParams, useNavigate, useLocation } from 'react-router-dom';

import { theme } from 'src/context/theme/ThemeProvider';
import { getOfferById } from 'src/api/offers/offers.api';
import { CircleLoading } from 'src/components/loading/CircleLoading';
import { CenteredView } from 'src/components/pages/CenteredView';
import { OfferInfoCard } from 'src/components/offers/info/OfferInfoCard';
import { useOffers } from 'src/context/offers/useOffers';
import { getPath, Path } from 'src/router/routes';
import { NotFound } from 'src/components/not-found/NotFound';

export const OfferPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getCachedOfferById } = useOffers();
    const [offer, setOffer] = useState<Offer | undefined>();
    const [isLoading, setIsLoading] = useState(true);
    const {state} = useLocation();

    useEffect(() => {
        const abortController = new AbortController(); 

        (async () => {
            setIsLoading(true);

            if(!id)
                return;
            
            let offer = getCachedOfferById(id);

            if(offer) {
                setIsLoading(false);
                setOffer(offer);
                return;
            }

            try {
                offer = await getOfferById(id, abortController.signal);
            }
            catch(error) {

            }

            setIsLoading(false);
            setOffer(offer);
        })();

        return () => abortController.abort();
    }, []);

    if(!id)
        return <Navigate to={getPath(Path.root)} />;

    if(isLoading)
        return <CenteredView>
            <CircleLoading />
        </CenteredView>;

    if(!offer)
        return <NotFound />;

    return  <CenteredView
        container={{
            justifyContent: 'flex-start',
            flexDirection: 'column',
            padding: '1rem',
            overflow: 'auto'
        }}
    >
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '900px',
            rowGap: '1rem'
        }}>
            <IconButton
                onClick={() => navigate('/', {state: {...state}})}
                sx={{
                    justifySelf: 'flex-start',
                    background: theme.palette.secondary.main,
                    borderRadius: '0.5rem',
                    width: '2.5rem',
                    ":hover": {
                        background: theme.palette.secondary.dark,
                    }
                }}
            >
                <ArrowBackIcon />
            </IconButton>
            <OfferInfoCard offer={offer}/>
        </Box>
    </CenteredView>;
};