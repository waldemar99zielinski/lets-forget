import * as L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import { Marker, Popup } from 'react-leaflet'

import { Icon, IconProps } from 'src/components/icon';

export interface MapMarkerProps {
    latitude: number;
    longitude: number;
    icon?: IconProps;
    popup?: JSX.Element;
}

export const MapMarker = (props: MapMarkerProps) => {

    const icon = props.icon 
        ? L.divIcon({
            html: ReactDOMServer.renderToString(<Icon {...props.icon}/>) 
        })
        : undefined;

    return <Marker 
        position={{lat: props.latitude, lng: props.longitude}}
        icon={icon}
    >
        {props.popup && <Popup>
            {props.popup}
        </Popup>}
    </Marker>;
}