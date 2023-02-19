interface OfferSchedule {
    offerId: string;
    dayOfTheWeek: DaysOfTheWeek;
    startTime: string;
    endTime: string; 
}

type DaysOfTheWeek = 
    'sunday' | 
    'monday' |
    'tuesday'|
    'wednesday'|
    'thursday' |
    'friday' |
    'saturday';
