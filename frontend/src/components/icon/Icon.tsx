import React from "react";
import {icons_svg, IconKeys} from "./icons_svg";

type Size = 'thin' | 'small' | 'standard' | 'big';

const get_icon_size = (scale: Size) => {
    switch (scale) {
        case 'thin':
            return 14;
        case 'small':
            return 16;
        case 'standard':
        default:
            return 24;
        case 'big':
            return 36;
    }
};


interface IconProps {
    iconKey: IconKeys;
    size?: Size;
    color?: string;
    onClick? : () => void;
}

export const Icon = (props: IconProps) => {
    const {iconKey, size = 'standard', color = 'black', onClick} = props;

    const size_px = get_icon_size(size);

    const icon = icons_svg[iconKey];

    return <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={icon.viewbox}
        width={size_px}
        height={size_px}
        overflow='visible'
        fill={color}
        onClick={onClick}
    >
        {icon.paths.map((icon_path, index) => <path key={index} d={icon_path}/>)}
    </svg>;
}
