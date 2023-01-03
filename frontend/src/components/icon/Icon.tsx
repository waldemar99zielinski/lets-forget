import { CSSProperties } from "react";

import {icons_svg, IconKeys} from "./icons_svg";

type Scale = 'small' | 'standard' | 'big';

const get_icon_size = (scale: Scale) => {
    switch (scale) {
        case 'small':
            return 16;
        case 'standard':
        default:
            return 24;
        case 'big':
            return 36;
    }
};

type IconRotation = 'up' | 'down' | 'left' | 'right';

export interface IconProps {
    iconKey: IconKeys;
    scale?: Scale | number;
    color?: string;
    onClick?: ()=>void
    style?: CSSProperties
}

export const Icon = (props: IconProps) => {
    const {iconKey, scale = 'standard', color = 'black', onClick} = props;

    const size = typeof scale === 'number' ? scale : get_icon_size(scale);

    const icon = icons_svg[iconKey];

    return <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={icon.viewbox}
        width={size}
        height={size}
        overflow='visible'
        fill={color}
        onClick={onClick}
        style={{
            ...props.style
        }}
    >
        {icon.paths.map((icon_path, index) => <path key={index} d={icon_path}/>)}
    </svg>;
}
