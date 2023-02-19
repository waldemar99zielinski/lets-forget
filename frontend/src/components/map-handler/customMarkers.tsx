import { MapMarker, MapMarkerProps } from 'src/components/map/MapMarker';
import { IconProps } from 'src/components/icon';
import { IconKeys } from 'src/components/icon';

interface BarMarkerProps {
    name: string;
}

export const barMarkerProps = (props: Omit<MapMarkerProps, 'icon'> & BarMarkerProps): MapMarkerProps => {
    return {
        latitude: props.latitude,
        longitude: props.longitude,
        icon: {
            iconKey: IconKeys.barDoors,
            scale: 36,
            style: {marginLeft: -13, marginTop: -15},
        },
        popup: <div>{props.name}</div>
    };
}

export const beerMarkerProps = (props: Omit<MapMarkerProps, 'icon'>): MapMarkerProps => {
    return {
        latitude: props.latitude,
        longitude: props.longitude,
        icon: {
            iconKey: IconKeys.beer,
            scale: 36,
            style: {marginLeft: -13, marginTop: -15},
        },
    };
}