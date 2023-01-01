import { createTestPlace } from "../modules-interaction/place.api";

import { places } from "./places.data";

const bootstrap = async () => {
    console.log('Creating places');
    await Promise.all(places.map(async (place) => {
        return createTestPlace(place);
    }));
    console.log('Places created');
}

void bootstrap();