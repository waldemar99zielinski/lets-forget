import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';

import { theme } from 'src/context/theme/ThemeProvider';
import { formatDate } from 'src/utils/date/formatDate';

interface OfferAvailabilityProps extends Pick<Offer, 'startsAt' | 'endsAt'> {
    schedules: OfferSchedule[];
}

export const OfferAvailability = (props: OfferAvailabilityProps) => {
    const {t} = useTranslation('offer');
    const isSchedules = useMemo(() => props.schedules.length > 0, [props.schedules.length])
    const [selectedSchedule, setSelectedSchedule] = useState<number | null>(null);

    return <Accordion sx={{
        backgroundColor: theme.palette.secondary.dark
    }}>
         <AccordionSummary
          expandIcon={<ExpandMoreIcon color={'secondary'}/>}
        >
          <Typography>{t('offer_availability')}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1rem'
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: '1rem'
            }}>
                <Typography>
                    {t('from')}
                </Typography>
                <Button
                    variant='contained'
                >
                    {formatDate(new Date(props.startsAt))}
                </Button>
                {props.endsAt && <>
                    <Typography>
                        {t('to')}
                    </Typography>
                    <Button
                        variant='contained'
                    >
                        {formatDate(new Date(props.endsAt))}
                    </Button>
                </>}
            </Box>
            {isSchedules && <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'center',
                rowGap: '1rem'
            }}>
                <Typography>
                    day of the week
                </Typography>
                <ButtonGroup 
                    variant='contained'
                    sx={{
                        justifyContent: 'center',
                        width: '100%',
                        boxShadow: 'none'
                    }}
                >
                    {/** TODO order by days of the week  and support multiple hours for one day with nice display :) */}
                    {props.schedules.map((schedule, index) => <Button
                        key={index}
                        onClick={() => setSelectedSchedule(index)}
                    >
                        {schedule.dayOfTheWeek}
                    </Button>)}
                </ButtonGroup>
                {typeof selectedSchedule === 'number' && <Button
                    variant='contained'
                    sx={{
                        width: '50%'
                    }}
                >
                    {`${props.schedules[selectedSchedule].startTime} - ${props.schedules[selectedSchedule].endTime}`}
                </Button>}
            </Box>
            }
        </AccordionDetails>
    </Accordion>;
}
