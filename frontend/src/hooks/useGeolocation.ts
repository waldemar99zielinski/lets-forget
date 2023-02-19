import { useEffect, useState } from 'react'

interface UseGeolocationProps {
    successCallback: PositionCallback;
    errorCallback: () => void;
    options?: PositionOptions;
}

export const useGeolocation = (props: UseGeolocationProps) => {
    const {options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    }} = props;

    const [watchId, setWatchId] = useState(0);

    useEffect(() => {
        const id = navigator.geolocation.watchPosition(props.successCallback, props.errorCallback, options);
        setWatchId(id);
        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

}