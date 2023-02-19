import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMemo, RefObject } from 'react';
import { useNavigate } from 'react-router-dom';

import { useIsMobile } from 'src/hooks/useIsMobile';
import { getPath, Path } from 'src/router/routes';
import { Icon } from 'src/components/icon';
import { getOfferTypeProps } from 'src/components/offers/common/getOfferTypeProps';

import { generateScale } from './scale-generator';

interface OfferCardProps {
    offer: Offer;
    parentContainerRef: RefObject<HTMLDivElement>;
}

const Container = styled.div<{image: string, scaleX: number, scaleY: number, isMobile: boolean}>`
    position: relative;
    overflow: hidden;
    display: flex;
    width: 100%;
    height: 150px;
    border-radius: 0.5rem;
    cursor: pointer;

    &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-image: ${props => `url(${props.image})`};
        background-size: cover;
        background-repeat: no-repeat;
        transform: ${props => `scale(${props.scaleX}, ${props.scaleY})`};
    }
`;

const MultipleLineEllipsis = styled(Typography)`
    display: -webkit-box-flex;
    width: 100%;
    max-width: 200px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

export const OfferCard = ({offer, parentContainerRef}: OfferCardProps) => {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const scale = useMemo(() => generateScale(), []);
    const offerTypeProps = useMemo(() => getOfferTypeProps(offer.typeId), [offer.typeId]);

    return <Container
        isMobile={isMobile}
        image={offerTypeProps.background}
        scaleX={scale.x}
        scaleY={scale.y}
        onClick={() => {
            navigate(getPath(Path.offer, `/${offer.id}`), {state: {listScrollY: parentContainerRef.current?.scrollTop}})
        }}
    >
        <Box
            padding='0.3rem'
            display='flex'
            width= '100%'
            height='100%'
            flexDirection='column'
            justifyContent='space-between'
        >
            <Typography>
                {offer.title}
            </Typography>
            <Typography
                  sx={{
                    fontSize: '0.7rem'
                }}
            >
                {offer.place.name}
            </Typography>
            <MultipleLineEllipsis
                sx={{
                    fontSize: '0.7rem',
                }}
            >
                {offer.description}
            </MultipleLineEllipsis>
            <Box
                display='flex'
                justifyContent='space-between'
            >
                <Icon iconKey={offerTypeProps.icon} color='white' scale={'big'}/>
                <Typography variant='h5'>
                    {offer.price} {offer.currency}
                </Typography>
            </Box>
        </Box>
    </Container>;
};

