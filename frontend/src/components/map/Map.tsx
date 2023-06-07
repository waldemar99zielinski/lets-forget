import 'leaflet/dist/leaflet.css';
import './map.css';

import * as L from 'leaflet';
import { forwardRef, Ref } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

import { MapMarker, MapMarkerProps } from './MapMarker';

const warsawCoords: L.LatLngExpression = [52.22977, 21.01178];
const warsawBounds: L.LatLngBoundsExpression = new L.LatLngBounds(
    {lat: 52.2715188, lng: 21.120014},
    {lat: 52.187930, lng: 20.903377}
)
const defaultZoom = 13;

interface MapProps {
    center?: L.LatLngExpression;
    zoom?: number;
    markers?: MapMarkerProps[];
}

export const Map = forwardRef((props: MapProps, ref: Ref<L.Map>) => {

    const {center = warsawCoords, zoom = defaultZoom} = props;
    
    return <MapContainer center={center} zoom={zoom}
        style={{
            height: '100%',
            width: '100%',
        }}
        ref={ref}
        // TODO move it to backend dependent on the city :)
        minZoom={13}
        maxBounds={warsawBounds}
    >
        <TileLayer
            attribution={`
                <a href="https://github.com/PaulLeCam/react-leaflet" target="_blank">React Leaflet</a>
                <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>
                <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap</a>`}
            url='https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=ObuHobZwTIovUEDxxnZ0'
        />
        {props.markers && props.markers.map((markerProps, index) => <MapMarker key={index} {...markerProps} />)}

        {/* {props.markers && props.markers.map((markerProps, index) => <Marker key={index} position={[markerProps.latitude, markerProps.longitude]} > </Marker>)} */}
  </MapContainer>;
});