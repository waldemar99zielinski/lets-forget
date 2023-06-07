
import * as L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import { Marker, Popup } from 'react-leaflet'

import { Icon, IconProps, IconWithBadge } from 'src/components/icon';

export interface MapMarkerProps {
    latitude: number;
    longitude: number;
    icon?: IconProps;
    popup?: JSX.Element;
    badge?: string | number;
    onClick?: () => void | Promise<void>;
}

export const MapMarker = (props: MapMarkerProps) => {

    const icon = props.icon 
        ? L.divIcon({
            html: ReactDOMServer.renderToString(props.badge ? <IconWithBadge iconProps={props.icon} badgeProps={{content: props.badge}}/> : <Icon {...props.icon}/>) 
        })
        : undefined;

    return <Marker 
        position={{lat: props.latitude, lng: props.longitude}}
        icon={icon}
        eventHandlers={{
            click: props.onClick
        }}
    >
        {props.popup && <Popup>
            {props.popup}
        </Popup>}
    </Marker>;
}