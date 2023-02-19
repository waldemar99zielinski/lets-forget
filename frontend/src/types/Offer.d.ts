enum DaysOfTheWeek {
    sunday = 0,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
}

interface Offer {
    id: string;
    placeId: string;
    authorId: string;
    typeId: string;
    
    title: string;
    description?: string;
    price?: number;
    currency?: number;

    startsAt: string;
    endsAt?: string;

    createdAt: Date;
    updatedAt: Date;

    place: Place;
    schedules: OfferSchedule[]
}