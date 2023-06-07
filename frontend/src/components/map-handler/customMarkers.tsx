import { theme } from 'src/context/theme/ThemeProvider';
import { MapMarkerProps } from 'src/components/map/MapMarker';
import { IconKeys, IconProps } from 'src/components/icon';

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
        ...props,
        icon: {
            iconKey: IconKeys.beer,
            scale: 36,
            color: theme.palette.background.default,
            marginLeft: -10,
            marginTop: -15,
        },
    };
}