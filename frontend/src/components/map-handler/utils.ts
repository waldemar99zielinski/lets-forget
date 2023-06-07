export const groupOffersByPlace = (offers: Offer[]) => {
    const offerMapByPlaceID: Record<string, Offer[]> = {};

    for(const offer of offers) {
        if(!offerMapByPlaceID[offer.placeId]) {
            offerMapByPlaceID[offer.placeId] = [offer];
        } else {
            offerMapByPlaceID[offer.placeId] = [...offerMapByPlaceID[offer.placeId], offer];
        }
    }

    return Object.values(offerMapByPlaceID).map((offerGroup) => ({
        place: offerGroup[0].place,
        count: offerGroup.length
    }));
}